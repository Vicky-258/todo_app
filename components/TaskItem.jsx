'use client';

import React from "react";
import { Trash, Pencil} from "lucide-react";

const TaskItem = ({ title, dueDate, priority, onEdit, onDelete }) => {
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
        <h3 className="text-lg font-bold text-black dark:text-white">
          {title}
        </h3>
        {dueDate && (
          <p className="text-sm text-gray-800 dark:text-gray-500">
            Due Date: {dueDate}
          </p>
        )}
      </div>

      <button
        onClick={onEdit}
        className="absolute top-11 right-4 bg-transparent border-none text-blue-500 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-800 text-sm"
      >
        <Pencil />
      </button>

      <button
        onClick={onDelete}
        className="absolute top-2 right-4 bg-transparent border-none text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-800 text-sm "
      >
        <Trash />
      </button>
    </div>
  );
};

export default TaskItem;
