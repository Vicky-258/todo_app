"use client";

import React from "react";
import { Trash, Pencil, Check } from "lucide-react";

const TaskItem = ({
  title,
  dueDate,
  priority,
  isEditing,
  editTitle,
  setEditTitle,
  onEdit,
  onSave,
  onDelete,
}) => {

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onSave(); // Save when Enter is pressed
      }
    };

  return (
    <div className="transition-discrete duration-500 flex justify-center items-center p-4 border rounded-4xl relative w-2xl bg-white dark:bg-neutral-800">
      <div
        className={`w-3 h-3 rounded-full absolute top-0.5 left-0.5 ${
          priority === "high"
            ? "bg-red-700 dark:bg-red-800"
            : "bg-green-700 dark:bg-green-800"
        }`}
      ></div>

      <div className="flex-1">
        {isEditing ? (
          <input
            className="text-lg font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-black dark:text-white"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key
            autoFocus // Automatically focus input when editing
          />
        ) : (
          <h3 className="text-lg font-bold text-black dark:text-white">
            {title}
          </h3>
        )}

        {dueDate && (
          <p className="text-sm text-gray-800 dark:text-gray-500">
            Due Date: {dueDate}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={onSave}
          className="absolute top-11 right-4 text-green-500 hover:text-green-700 dark:text-green-600 dark:hover:text-green-800 text-sm"
        >
          <Check />
        </button>
      ) : (
        <button
          onClick={onEdit}
          className="absolute top-11 right-4 text-blue-500 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-800 text-sm"
        >
          <Pencil />
        </button>
      )}

      <button
        onClick={onDelete}
        className="absolute top-2 right-4 text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-800 text-sm"
      >
        <Trash />
      </button>
    </div>
  );
};

export default TaskItem;
