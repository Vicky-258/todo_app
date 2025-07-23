"use client";

import { Trash, Pencil, Clock } from "lucide-react";
import { useState } from "react";
import { updateTaskStatus } from "@/services/taskService";

const TaskItemCard = ({
  TaskId,
  title,
  dueDate,
  due_time,
  priority,
  isCompleted,
  deleteTask,
  onclick,
  modelOpen = false,
  updateTaskStatus,
}) => {
  const priorityStyles = {
    high: "border-redC text-redC bg-[oklch(0.98_0.1_28)]",
    medium: "border-yellow-700 text-yellow-700 bg-[oklch(0.98_0.05_100)]",
    low: "border-green-700 text-green-700 bg-[oklch(0.98_0.045_145)]",
  };

  const [isCompletedLocal, setIsCompleted] = useState(isCompleted);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const task = {
    id: TaskId,
    title,
    due_date: dueDate,
    due_time: due_time,
    priority,
    is_completed: isCompletedLocal,
  };

  return (
    <div
      className="bg-card dark:bg-cardDark border border-borderC dark:border-borderCDark 
    rounded-2xl p-4 shadow-xl w-[280px] h-[180px] flex flex-col justify-between 
    transition-transform duration-300 ease-in-out hover:scale-[1.035] overflow-hidden"
      onClick={() => {
        onclick(task);
      }}
    >
      {/* Top Bar: Checkbox + Priority */}
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          checked={isCompletedLocal}
          onClick={(e) => e.stopPropagation()}
          onChange={() => {
            const newStatus = !isCompletedLocal;
            setIsCompleted(newStatus);
            updateTaskStatus(TaskId, newStatus);
          }}
          title="Mark as completed"
          aria-label="Task completion checkbox"
          className="w-4 h-4 dark:accent-primaryDark accent-primary cursor-pointer"
        />

        <span
          aria-label="Task priority"
          className={`text-xs px-2.5 py-0.5 rounded-full font-medium border 
    ${priorityStyles[priority.toLowerCase()]}`}
        >
          {priority === "Medium" ? "Mid" : priority}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-bold font-cool tracking-tight leading-snug 
    ${
      isCompletedLocal
        ? "line-through opacity-60"
        : "text-TextC dark:text-TextCDark"
    }`}
      >
        {toTitleCase(title)}
      </h3>

      {/* Bottom Meta: Due Date */}
      <div className="flex items-center gap-1 justify-between text-sm text-gray-600 dark:text-gray-500">
        {/* <Clock size={16} /> */}
        <p>Due: {dueDate || "Not set"}</p>
        <span
          className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(TaskId);
          }}
        >
          <Trash size={16} />
        </span>
      </div>
    </div>
  );
};

export default TaskItemCard;
