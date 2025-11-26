"use client";

import React from "react";
import { CalendarIcon, ClockIcon, X } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";

const TaskModalDisplay = ({ isOpen, onClose, task, onEditClick }) => {
  if (!isOpen || !task) return null;

  const priorityConfig = {
    high: { color: "text-redC dark:text-redCDark", bg: "bg-redC/10 dark:bg-redCDark/10", border: "border-redC/20 dark:border-redCDark/20" },
    medium: { color: "text-orangeC", bg: "bg-orangeC/10", border: "border-orangeC/20" },
    low: { color: "text-TextMuted", bg: "bg-gray-100 dark:bg-white/5", border: "border-borderC dark:border-borderCDark" },
  };

  const pStyle = priorityConfig[task.priority?.toLowerCase()] || priorityConfig.low;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-cardDark p-0 rounded-xl 
        shadow-[0_8px_30px_var(--color-CardShadows)] dark:shadow-[0_8px_30px_var(--color-CardShadowsDark)]
        w-[95%] max-w-lg border border-borderC dark:border-borderCDark animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderC dark:border-borderCDark bg-bground/50 dark:bg-bgroundDark/50">
          <div className="flex items-center gap-3">
            <span className={clsx(
              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
              pStyle.color, pStyle.bg, pStyle.border
            )}>
              {task.priority}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-TextMuted hover:text-TextC dark:hover:text-TextCDark transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-TextC dark:text-TextCDark leading-tight">
              {task.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-borderC dark:border-borderCDark border-dashed">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 rounded-md bg-primary/5 dark:bg-primaryDark/10 text-primary dark:text-primaryDark">
                <CalendarIcon size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-TextMuted uppercase tracking-wide">Due Date</span>
                <span className="font-medium text-TextC dark:text-TextCDark">
                  {task.due_date ? format(new Date(task.due_date), "MMM d, yyyy") : "Not set"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 rounded-md bg-primary/5 dark:bg-primaryDark/10 text-primary dark:text-primaryDark">
                <ClockIcon size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-TextMuted uppercase tracking-wide">Time</span>
                <span className="font-medium text-TextC dark:text-TextCDark">
                  {task.due_time || "All day"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-TextMuted uppercase tracking-wider">Description</label>
            <div className="text-sm text-TextC dark:text-TextCDark leading-relaxed whitespace-pre-wrap min-h-[80px]">
              {task.description || <span className="text-TextMuted italic">No description provided.</span>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 border-t border-borderC dark:border-borderCDark flex justify-end">
          <button
            onClick={() => {
              onClose();
              onEditClick(task);
            }}
            className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary 
            text-white px-4 py-2 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 
            transition-all duration-200 font-medium text-sm active:scale-95"
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModalDisplay;
