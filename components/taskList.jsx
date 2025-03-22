"use client";

import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { Calendar, Plus, Flag } from "lucide-react";
import { motion } from "framer-motion";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [focused, setFocused] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        dueDate: dueDate || "No Due Date",
        priority,
      },
    ]);

    setNewTask("");
    setDueDate("");
    setPriority("low");
  };

  return (
    <div className="space-y-4">
      {/* Task Input */}
      <motion.div
      className="flex gap-2 p-4 border rounded-lg bg-white dark:bg-neutral-800 shadow shadow-black dark:shadow dark:shadow-neutral-700 transition-all"
      animate={{
        scale: focused ? 1.05 : 1,
        boxShadow: focused
          ? "0px 0px 12px rgba(59, 130, 246, 0.5)"
          : "0px 0px 6px rgba(0, 0, 0, 0.1)",
        borderColor: focused ? "rgb(59, 130, 246)" : "transparent",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Input Field */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && console.log("Add Task")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(newTask.length > 0)}
        placeholder="Add a new task..."
        className="flex-1 p-2 border dark:border-white rounded dark:text-white text-black border-black bg-transparent outline-none"
      />

      {/* Priority Toggle */}
      <button
        onClick={() => setPriority(priority === "low" ? "high" : "low")}
        className={`p-2 rounded-lg transition ${
          priority === "high" ? "text-red-500" : "text-green-500"
        }`}
      >
        <Flag size={16} />
      </button>

      {/* Due Date Picker */}
      <div className="relative">
        <button
          className="p-2 rounded-lg h-10"
          onClick={() => document.getElementById("datePicker").showPicker()}
        >
          <Calendar size={16} />
        </button>
        <input
          type="date"
          id="datePicker"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="absolute opacity-0"
        />
      </div>
    </motion.div>

      {/* Task List */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          dueDate={task.dueDate}
          priority={task.priority}
          onEdit={() => console.log("Edit Task:", task.id)}
          onDelete={() => setTasks(tasks.filter((t) => t.id !== task.id))}
        />
      ))}
    </div>
  );
};

export default TaskList;
