"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/sideBar";
import TopSection from "@/components/TopSection";
import TaskList from "@/components/taskList";
import TaskInput from "@/components/TaskInput";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const [isSideBarOpen, setisSideBarOpen] = useState(false);

  function HandlesidebarOpen() {
    setisSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);


  function addTask(title) {
    const newTask = {
      id: Date.now() + Math.random(),
      title,
      dueDate: null,
      priority: "low",
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
      return updatedTasks;
    });
  }

  function deleteTask(id) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  const updateTask = (id, newTitle, newDueDate, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              dueDate: newDueDate,
              priority: newPriority,
            }
          : task
      )
    );
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
            dueDate: newDueDate,
            priority: newPriority,
          }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="flex bg-bground dark:bg-bgroundDark min-h-screen transition duration-500 ease-in-out">
      <TopSection isOpen={isSideBarOpen} ToggleSideBar={HandlesidebarOpen} />

      <div className="flex flex-1 pt-24 flex-col w-full items-center">
        <TaskInput onAddTask={addTask} />
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
