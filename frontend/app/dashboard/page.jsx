"use client"

import { useState, useEffect, useMemo } from "react"
import { useAuth } from "@/lib/context/AuthContext"
import { getTasks, addTask, updateTask, deleteTask, updateTaskStatus } from "@/lib/api"
import { TaskCard } from "@/components/dashboard/task-card"
import { TaskModal } from "@/components/dashboard/task-modal"
import { TaskDrawer } from "@/components/dashboard/task-drawer"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { AnimatePresence, motion } from "framer-motion"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null) // For Drawer
    const [editingTask, setEditingTask] = useState(null) // For Modal

    // Filter & Sort State
    const [searchQuery, setSearchQuery] = useState("")
    const [filterPriority, setFilterPriority] = useState("All")
    const [filterStatus, setFilterStatus] = useState("All")
    const [sortBy, setSortBy] = useState("newest")

    // Load preferences from localStorage
    useEffect(() => {
        const savedSort = localStorage.getItem("dashboardSort")
        if (savedSort) setSortBy(savedSort)

        const savedFilterPriority = localStorage.getItem("dashboardFilterPriority")
        if (savedFilterPriority) setFilterPriority(savedFilterPriority)
    }, [])

    // Save preferences
    useEffect(() => {
        localStorage.setItem("dashboardSort", sortBy)
    }, [sortBy])

    useEffect(() => {
        localStorage.setItem("dashboardFilterPriority", filterPriority)
    }, [filterPriority])

    // Keyboard Shortcut for New Task
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "n") {
                e.preventDefault()
                openCreateModal()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        if (user) {
            fetchTasks()
        }
    }, [user])

    const fetchTasks = async () => {
        try {
            setIsLoading(true)
            const data = await getTasks()
            setTasks(data)
        } catch (error) {
            toast.error("Failed to fetch tasks")
        } finally {
            setIsLoading(false)
        }
    }

    // Optimistic Updates
    const handleCreateTask = async (taskData) => {
        try {
            const tempId = Date.now()
            const optimisticTask = { ...taskData, id: tempId, created_at: new Date().toISOString(), is_completed: false }
            setTasks(prev => [optimisticTask, ...prev])
            setIsModalOpen(false)

            const newTask = await addTask(taskData)
            setTasks(prev => prev.map(t => t.id === tempId ? newTask : t))
            toast.success("Task created successfully")
        } catch (error) {
            setTasks(prev => prev.filter(t => t.id !== Date.now())) // Simplified rollback
            toast.error("Failed to create task")
            fetchTasks() // Re-fetch to be safe
        }
    }

    const handleUpdateTask = async (taskData) => {
        try {
            const updatedOptimistic = { ...editingTask, ...taskData }
            setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedOptimistic : t))
            setIsModalOpen(false)
            setEditingTask(null)

            const result = await updateTask(editingTask.id, taskData)
            if (result.success) {
                setTasks(prev => prev.map(t => t.id === editingTask.id ? result.data : t))
                toast.success("Task updated")
            } else {
                throw new Error("Update failed")
            }
        } catch (error) {
            toast.error("Failed to update task")
            fetchTasks()
        }
    }

    const handleDeleteTask = async (id) => {
        const previousTasks = [...tasks]
        try {
            setTasks(prev => prev.filter(t => t.id !== id))
            setSelectedTask(null) // Close drawer if open

            await deleteTask(id)
            toast.success("Task deleted")
        } catch (error) {
            setTasks(previousTasks)
            toast.error("Failed to delete task")
        }
    }

    const handleToggleStatus = async (id, isCompleted) => {
        const previousTasks = [...tasks]
        try {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: isCompleted } : t))

            const result = await updateTaskStatus(id, isCompleted)
            if (result.success) {
                if (isCompleted) {
                    toast.success("Task completed 🎉", {
                        action: {
                            label: "Undo",
                            onClick: () => handleToggleStatus(id, false)
                        }
                    })
                }
            } else {
                throw new Error("Status update failed")
            }
        } catch (error) {
            setTasks(previousTasks)
            toast.error("Failed to update status")
        }
    }

    const openCreateModal = () => {
        setEditingTask(null)
        setIsModalOpen(true)
    }

    const openEditModal = (task) => {
        setEditingTask(task)
        setIsModalOpen(true)
    }

    const handleTaskClick = (task) => {
        setSelectedTask(task)
    }

    // Smart Sorting & Filtering Logic
    const processedTasks = useMemo(() => {
        let result = [...tasks]

        // 1. Filtering
        result = result.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesPriority = filterPriority === "All" || task.priority === filterPriority
            const matchesStatus = filterStatus === "All" ||
                (filterStatus === "Completed" ? task.is_completed : !task.is_completed)

            return matchesSearch && matchesPriority && matchesStatus
        })

        // 2. Sorting
        result.sort((a, b) => {
            // Always sort completed to bottom if not specifically filtering for them
            if (a.is_completed !== b.is_completed && filterStatus === "All") {
                return a.is_completed ? 1 : -1
            }

            switch (sortBy) {
                case "newest":
                    return new Date(b.created_at) - new Date(a.created_at)
                case "oldest":
                    return new Date(a.created_at) - new Date(b.created_at)
                case "priority_high":
                    const pOrder = { High: 3, Medium: 2, Low: 1 }
                    return pOrder[b.priority] - pOrder[a.priority]
                case "deadline_soonest":
                    if (!a.due_date) return 1
                    if (!b.due_date) return -1
                    return new Date(a.due_date) - new Date(b.due_date)
                case "a_z":
                    return a.title.localeCompare(b.title)
                default:
                    return 0
            }
        })

        return result
    }, [tasks, searchQuery, filterPriority, filterStatus, sortBy])

    if (loading) return null

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 relative z-10">
                <div className="space-y-2 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground/50 pb-2"
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground font-light"
                    >
                        Your mind, organized. Stay in flow.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Button onClick={openCreateModal} size="lg" className="glass-button group text-base px-8 h-12 rounded-full">
                        <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                        New Task
                        <span className="ml-3 text-xs bg-white/20 px-2 py-0.5 rounded text-white/80 hidden sm:inline-block">⌘N</span>
                    </Button>
                </motion.div>
            </div>

            {/* Filter Bar */}
            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Task Grid */}
            <div className="flex-1 relative z-10">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-48 rounded-2xl bg-muted/10 animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : processedTasks.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
                    >
                        <AnimatePresence mode="popLayout">
                            {processedTasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TaskCard
                                        task={task}
                                        onClick={handleTaskClick}
                                        onToggleStatus={handleToggleStatus}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-[50vh] text-center"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <div className="relative bg-background/50 p-6 rounded-full border border-white/10 backdrop-blur-sm">
                                <Sparkles className="h-12 w-12 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">You're all caught up ✨</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            {searchQuery || filterPriority !== "All"
                                ? "No tasks match your filters. Try adjusting them."
                                : "Add a task to stay in flow and keep track of your goals."}
                        </p>
                        {(searchQuery || filterPriority !== "All") && (
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchQuery("")
                                    setFilterPriority("All")
                                    setFilterStatus("All")
                                }}
                                className="mt-4"
                            >
                                Clear all filters
                            </Button>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Modals & Drawers */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                taskToEdit={editingTask}
            />

            <TaskDrawer
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                onEdit={(task) => {
                    setSelectedTask(null)
                    openEditModal(task)
                }}
                onDelete={(id) => {
                    handleDeleteTask(id)
                    setSelectedTask(null)
                }}
            />
        </div>
    )
}
