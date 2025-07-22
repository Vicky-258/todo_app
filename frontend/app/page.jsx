"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/sideBar";
import TopSection from "@/components/TopSection";
import TaskGrid from "@/components/TaskGrid";
import TaskModal from "@/components/TaskModal";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ClientToaster from "@/components/ClientToaster";
import { addTask, deleteTask, updateTask } from "@/services/taskService";
import { refreshToken } from "@/lib/auth";
import TaskModalDisplay from "@/components/TaskModalDisplay";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [addopen, setAddOpen] = useState(false);
  const [displayopen, setDisplayOpen] = useState(false);
  const [isSideBarOpen, setisSideBarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const router = useRouter();

  function HandlesidebarOpen() {
    setisSideBarOpen(!isSideBarOpen);
    console.log("Sidebar toggled. Is open?", isSideBarOpen);
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              const response = await axios.get(
                "http://127.0.0.1:8000/api/tasks/",
                {
                  withCredentials: true,
                }
              );
              setTasks(response.data);
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
  }, []);

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

  const handleUpdate = async (id, newTitle, newDueDate, newPriority) => {
    const { success, data, error } = await updateTask(
      id,
      newTitle,
      newDueDate,
      newPriority
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
    <div className="flex bg-bground dark:bg-bgroundDark min-h-screen transition duration-500 ease-in-out">
      <ClientToaster />
      <TopSection isOpen={isSideBarOpen} ToggleSideBar={HandlesidebarOpen} />
      <div className="flex flex-1 pt-24 flex-col w-full items-center gap-24 px-4">
        <div className="flex flex-row justify-between md:space-x-96 space-x-28">
          <h1
            className="text-4xl md:text-7xl font-bold text-TextC dark:text-TextCDark drop-shadow-md shadow-FloatingShadow
          dark:shadow-FloatingShadowDark"
          >
            Tasks
          </h1>
          <div className="relative group w-fit">
            <button
              className="bg-primary dark:bg-primaryDark w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full"
              onClick={() => setAddOpen(true)}
            >
              <FiPlus size={24} className="text-TextCDark" />
            </button>

            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
              Add Task
            </span>
          </div>
        </div>
        <TaskModal
          isOpen={addopen}
          onClose={() => setAddOpen(false)}
          onSubmit={handleAdd}
        />
        <TaskModalDisplay
          isOpen={displayopen}
          onClose={() => setDisplayOpen(false)}
          task={selectedTask}
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
      </div>
      <SideBar isOpen={isSideBarOpen} setIsOpen={setisSideBarOpen} />
    </div>
  );
}
