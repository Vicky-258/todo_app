"use client";

import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete AI project",
      dueDate: "2025-03-25",
      priority: "high",
    },
    { id: 2, title: "Review PRs", dueDate: "2025-03-22", priority: "low" },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit Task:", id);
  };

  return (
    <div className="space-y-4">
          {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          dueDate={task.dueDate}
          priority={task.priority}
          onEdit={() => handleEdit(task.id)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
