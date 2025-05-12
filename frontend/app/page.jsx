"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/sideBar";
import TopSection from "@/components/TopSection";
import TaskList from "@/components/taskList";
import TaskModal from "@/components/TaskModal";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSideBarOpen, setisSideBarOpen] = useState(false);
  const router = useRouter();

  function HandlesidebarOpen() {
    setisSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          withCredentials: true, // Make sure cookies are sent with the request
        });

        setTasks(response.data); // Update state with fetched tasks
      } catch (error) {
        if (error.response?.status === 401) {
          // Try to refresh the token
          try {
            await axios.post(
              "http://127.0.0.1:8000/api/token/refresh/",
              {},
              {
                withCredentials: true,
              }
            );

            // Retry the original request after refreshing
            const response = await axios.get(
              "http://127.0.0.1:8000/api/tasks/",
              {
                withCredentials: true,
              }
            );

            setTasks(response.data);
          } catch (refreshError) {
            toast.error("⚠️ Session expired. Please log in again.");
            router.push("/auth/login");
          }
        } else {
          console.error("Error fetching tasks:", error);
          toast.error("❌ Failed to fetch tasks. Please try again.");
        }
      }
    };

    fetchTasks(); // Call the fetch function on mount
  }, []);

  async function addTask(title, dueDate = null, priority = "low") {
    try {

      const formattedDueDate = dueDate
        ? new Date(dueDate).toLocaleDateString("en-CA")
        : null;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/tasks/",
        {
          title,
          due_date: formattedDueDate,
          priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        },
        {
          withCredentials: true, // Send cookies automatically
        }
      );

      const createdTask = response.data;
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      toast.success("✅ Task added!");
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to refresh the token
        try {
          await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {},
            {
              withCredentials: true,
            }
          );

          // Retry the original request after refreshing
          const response = await axios.post(
            "http://127.0.0.1:8000/api/tasks/",
            {
              title,
              due_date: dueDate,
              priority: priority.charAt(0).toUpperCase() + priority.slice(1),
            },
            {
              withCredentials: true,
            }
          );

          const createdTask = response.data;
          setTasks((prevTasks) => [...prevTasks, createdTask]);
          toast.success("✅ Task added!");
        } catch (refreshError) {
          toast.error("⚠️ Session expired. Please log in again.");
          router.push("/auth/login");
        }
      } else {
        console.error("Error:", error);
      }
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        withCredentials: true, // Send cookies automatically
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success("🗑️ Task deleted!");
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to refresh the token
        try {
          await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {},
            {
              withCredentials: true,
            }
          );

          // Retry the original request after refreshing
          await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            withCredentials: true,
          });

          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          toast.success("🗑️ Task deleted!");
        } catch (refreshError) {
          toast.error("⚠️ Session expired. Please log in again.");
          router.push("/auth/login");
        }
      } else {
        console.error("Error:", error);
      }
    }
  }

  async function updateTask(id, newTitle, newDueDate, newPriority) {
    try {

      const formattedDueDate = newDueDate
        ? new Date(newDueDate).toLocaleDateString("en-CA")
        : null;

      const response = await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        {
          title: newTitle,
          due_date: formattedDueDate,
          priority: newPriority,
        },
        {
          withCredentials: true, // Send cookies automatically
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
      toast.success("✅ Task updated!");
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to refresh the token
        try {
          await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {},
            {
              withCredentials: true,
            }
          );

          // Retry the original request after refreshing
          const response = await axios.put(
            `http://127.0.0.1:8000/api/tasks/${id}/`,
            {
              title: newTitle,
              due_date: formattedDueDate,
              priority: newPriority,
            },
            {
              withCredentials: true,
            }
          );

          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? response.data : task))
          );
          toast.success("✅ Task updated!");
        } catch (refreshError) {
          toast.error("⚠️ Session expired. Please log in again.");
          router.push("/auth/login");
        }
      } else {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div className="flex bg-bground dark:bg-bgroundDark min-h-screen transition duration-500 ease-in-out">
      <TopSection isOpen={isSideBarOpen} ToggleSideBar={HandlesidebarOpen} />

      <div className="flex flex-1 pt-24 flex-col w-full items-center">
        <div className="flex flex-row justify-between md:space-x-96 space-x-28">
          <h1
            className="text-4xl md:text-6xl font-bold text-TextC dark:text-TextCDark drop-shadow-md shadow-FloatingShadow
          dark:shadow-FloatingShadowDark"
          >
            Tasks
          </h1>
          <button
            className="bg-primary dark:bg-primaryDark w-12 h-12 md:w-15 md:h-15 flex items-center justify-center rounded-full"
            onClick={() => setOpen(true)}
          >
            <FiPlus size={24} className="text-TextCDark" />
          </button>
        </div>
        <TaskModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSubmit={addTask}
        />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>

      <SideBar isOpen={isSideBarOpen} setIsOpen={setisSideBarOpen} />
    </div>
  );
}
