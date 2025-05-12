"use client";
import React, { useState } from "react";

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(task);
    setTask("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm text-TextC
      dark:text-TextCDark"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-cardDark p-6 rounded-2xl shadow-2xl w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="ml-auto mb-2 block text-sm text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✖ Close
        </button>
        <h2 className="text-xl font-bold mb-4">📝 New Task</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Enter task..."
          className="w-full p-2 rounded border dark:bg-zinc-800"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
