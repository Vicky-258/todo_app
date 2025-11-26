"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/sideBar";
import TopSection from "@/components/TopSection";
import TaskGrid from "@/components/TaskGrid";
import TaskModal from "@/components/TaskModal";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ClientToaster from "@/components/ClientToaster";
import { addTask, deleteTask, updateTask } from "@/services/taskService";
import { refreshToken } from "@/lib/auth";
import TaskModalDisplay from "@/components/TaskModalDisplay";
import axiosInstance from "@/lib/axiosInstance";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [addopen, setAddOpen] = useState(false);
  const [displayopen, setDisplayOpen] = useState(false);
  const [isSideBarOpen, setisSideBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterType, setFilterType] = useState("uncompleted");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  function HandlesidebarOpen() {
    setisSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const url =
        filterType === "" ? "/api/tasks/" : `/api/tasks/?filter=${filterType}`;

      const tryFetch = async () => {
        const response = await axiosInstance.get(url);
        setTasks(response.data);
      };

      try {
        await tryFetch();
      } catch (error) {
        if (error.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              await tryFetch();
            } catch (retryError) {
              console.error("Retry after refresh failed:", retryError);
              toast.error("❌ Still failed after refresh.");
            }
          } else {
            toast.error("⚠️ Session expired. Please log in again.");
            router.push("/auth/login");
          }
        } else {
          console.error("Error fetching tasks:", error);
          toast.error("❌ Failed to fetch tasks. Please try again.");
        }
      }
    };

    fetchTasks();
  }, [filterType]);

  async function handleAdd(title, dueDate, priority, description) {
    try {
      const createdTask = await addTask({
        title,
        dueDate,
        priority,
        description,
      });
      setTasks((prev) => [...prev, createdTask]);
      toast.success("✅ Task added!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("⚠️ Session expired. Please log in again.");
        router.push("/auth/login");
      } else {
        console.error("Error adding task:", error);
        toast.error("❌ Failed to add task.");
      }
    }
  }

  const handleDelete = async (id) => {
    const success = await deleteTask(id);
    if (success) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("🗑️ Task deleted!");
    } else {
      toast.error("❌ Could not delete task. Try again.");
    }
  };

  const handleUpdate = async (
    id,
    newTitle,
    newDueDate,
    newPriority,
    newDescription,
    newDueTime
  ) => {
    const { success, data, error } = await updateTask(
      id,
      newTitle,
      newDueDate,
      newPriority,
      undefined,
      newDescription,
      newDueTime
    );

    if (success) {
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      toast.success("✅ Task updated!");
    } else {
      console.error("Update error:", error);
      toast.error("❌ Failed to update task. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-bground dark:bg-bgroundDark text-TextC dark:text-TextCDark font-pro selection:bg-primarySoft selection:text-primaryDark">
      <ClientToaster />

      <SideBar
        isOpen={isSideBarOpen}
        setIsOpen={setisSideBarOpen}
        setFilterType={setFilterType}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <TopSection isOpen={isSideBarOpen} ToggleSideBar={HandlesidebarOpen} />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-row justify-between items-end border-b border-borderC dark:border-borderCDark pb-6">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-TextC dark:text-TextCDark">
                Tasks
              </h1>
              <p className="text-sm text-TextMuted font-medium">
                Manage your daily goals and projects
              </p>
            </div>

            <button
              className="group relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl 
              bg-primary dark:bg-primaryDark text-white shadow-lg shadow-primary/20 
              hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => setAddOpen(true)}
              aria-label="Add new task"
            >
              <FiPlus size={22} />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 
                transition-transform bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] font-bold 
                px-2 py-1 rounded shadow-md whitespace-nowrap z-10 pointer-events-none">
                ADD TASK
              </span>
            </button>
          </div>

          <TaskModal
            isOpen={addopen || isModalOpen}
            onClose={() => {
              setAddOpen(false);
              setIsModalOpen(false);
              setIsEditMode(false);
              setTaskToEdit(null);
            }}
            onSubmit={(...args) => {
              if (isEditMode) {
                handleUpdate(...args);
              } else {
                handleAdd(...args);
              }
            }}
            taskToEdit={taskToEdit}
            setTaskToEdit={setTaskToEdit}
            isEditMode={isEditMode}
          />

          <TaskModalDisplay
            isOpen={displayopen}
            onClose={() => setDisplayOpen(false)}
            task={selectedTask}
            onEditClick={(task) => {
              setTaskToEdit(task);
              setIsEditMode(true);
              setIsModalOpen(true);
            }}
          />

          <TaskGrid
            tasks={tasks}
            deleteTask={handleDelete}
            updateTask={handleUpdate}
            onCardClick={(task) => {
              setSelectedTask(task);
              setDisplayOpen(true);
            }}
            modelOpen={displayopen}
          />
        </main>
      </div>
    </div>
  );
}
