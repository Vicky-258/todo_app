"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Need to create Textarea
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function TaskModal({ isOpen, onClose, onSubmit, taskToEdit }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: null,
        dueTime: "",
    })

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description || "",
                priority: taskToEdit.priority,
                dueDate: taskToEdit.due_date ? new Date(taskToEdit.due_date) : null,
                dueTime: taskToEdit.due_time || "",
            })
        } else {
            setFormData({
                title: "",
                description: "",
                priority: "Low",
                dueDate: null,
                dueTime: "",
            })
        }
    }, [taskToEdit, isOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{taskToEdit ? "Edit Task" : "Create Task"}</DialogTitle>
                    <DialogDescription>
                        {taskToEdit ? "Make changes to your task here." : "Add a new task to your list."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Task title"
                            required
                            className="glass-input"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add details..."
                            className="glass-input resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Priority</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                            >
                                <SelectTrigger className="glass-input">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal glass-input",
                                            !formData.dueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.dueDate}
                                        onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="time">Time (Optional)</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="time"
                                type="time"
                                value={formData.dueTime}
                                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                                className="pl-9 glass-input"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="glass-button">
                            {taskToEdit ? "Save Changes" : "Create Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
