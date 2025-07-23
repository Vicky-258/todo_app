"use client";

import React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";

const TaskModalDisplay = ({ isOpen, onClose, task }) => {
    if (!isOpen || !task) return null;
      const priorityStyles = {
        high: "text-redC",
        medium: "text-yellow-700",
        low: "text-green-700",
      };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="dark:bg-cardDark bg-card p-6 rounded-2xl shadow-2xl shadow-CardShadows dark:shadow-CardShadowsDark
        w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-TextC dark:text-TextCDark font-semibold mb-4 flex items-center gap-2">
          📋 Task Details
        </h2>

        <div className="space-y-4 text-TextC dark:text-TextCDark text-sm">
          <div>
            <strong>Title:</strong>
            <p className="mt-1 bg-white/10 dark:bg-white/5 px-3 py-2 rounded-md">
              {task.title}
            </p>
          </div>

          <div>
            <strong>Description:</strong>
            <p className="mt-1 bg-white/10 dark:bg-white/5 px-3 py-2 rounded-md">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>
              <strong>Due Date:</strong>{" "}
              {task.due_date
                ? format(new Date(task.due_date), "dd/MM/yyyy")
                : "Not set"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>
              <strong>Due Time:</strong> {task.due_time || "Not specified"}
            </span>
          </div>

          <div>
            <strong>Priority:</strong>
            <strong
              className={`mt-1 px-3 py-2 rounded-md inline-block ${
                priorityStyles[task.priority.toLowerCase()]
              }`}
            >
              {task.priority}
            </strong>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => {
              // Trigger your edit logic here
              console.log("Edit clicked");
            }}
            className="bg-primary dark:bg-primaryDark text-TextC dark:text-TextCDark px-4 py-2 rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModalDisplay;
