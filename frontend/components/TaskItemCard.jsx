"use client";

import { Trash, Clock, Calendar, Check } from "lucide-react";
import { useState } from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { updateTaskStatus } from "@/services/taskService";
import clsx from "clsx";

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
  const [isCompletedLocal, setIsCompleted] = useState(isCompleted);

  const priorityConfig = {
    high: { color: "text-redC dark:text-redCDark", bg: "bg-redC/10 dark:bg-redCDark/10", border: "border-redC/20 dark:border-redCDark/20" },
    medium: { color: "text-orangeC", bg: "bg-orangeC/10", border: "border-orangeC/20" },
    low: { color: "text-TextMuted", bg: "bg-gray-100 dark:bg-white/5", border: "border-borderC dark:border-borderCDark" },
  };

  const pStyle = priorityConfig[priority?.toLowerCase()] || priorityConfig.low;

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

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
      className={clsx(
        "group relative flex flex-col justify-between p-4 rounded-xl transition-all duration-200 ease-out",
        "bg-card dark:bg-cardDark border border-borderC dark:border-borderCDark",
        "hover:border-primary/30 dark:hover:border-primaryDark/30",
        "hover:shadow-[0_4px_20px_var(--color-CardShadows)] dark:hover:shadow-[0_4px_20px_var(--color-CardShadowsDark)]",
        "cursor-pointer select-none min-h-[140px]"
      )}
      onClick={() => onclick(task)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isCompletedLocal}
            onChange={() => {
              const newStatus = !isCompletedLocal;
              setIsCompleted(newStatus);
              updateTaskStatus(TaskId, newStatus);
            }}
            className="peer appearance-none w-5 h-5 rounded-full border border-borderCDark/30 dark:border-borderCDark 
            checked:bg-primary checked:border-primary dark:checked:bg-primaryDark dark:checked:border-primaryDark 
            hover:border-primary dark:hover:border-primaryDark transition-all duration-200 cursor-pointer"
          />
          <Check
            size={12}
            className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
            strokeWidth={3}
          />
        </div>

        <span className={clsx(
          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
          pStyle.color, pStyle.bg, pStyle.border
        )}>
          {priority}
        </span>
      </div>

      <h3 className={clsx(
        "text-sm font-medium leading-relaxed line-clamp-3 mb-4 transition-colors duration-200",
        isCompletedLocal
          ? "text-TextMuted line-through decoration-borderCDark"
          : "text-TextC dark:text-TextCDark"
      )}>
        {toTitleCase(title)}
      </h3>

      <div className="mt-auto pt-3 border-t border-borderC dark:border-borderCDark flex items-center justify-between">
        <div className={clsx(
          "flex items-center gap-1.5 text-xs font-medium transition-colors duration-200",
          !dueDate || isCompletedLocal ? "text-TextMuted" : "text-TextMuted group-hover:text-TextC dark:group-hover:text-TextCDark"
        )}>
          <Calendar size={12} />
          <span>{formatDate(dueDate)}</span>
        </div>

        <button
          className="text-TextMuted hover:text-redC dark:hover:text-redCDark opacity-0 group-hover:opacity-100 
          transition-all duration-200 p-1 -mr-1 rounded hover:bg-redC/5 dark:hover:bg-redCDark/10"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(TaskId);
          }}
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskItemCard;
