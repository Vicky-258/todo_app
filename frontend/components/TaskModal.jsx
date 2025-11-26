"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import PriorityDropdown from "./PriorityDropdown";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns"; // To format date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
  setTaskToEdit,
  isEditMode,
}) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setpriority] = useState("low");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (isEditMode) {
      onSubmit(taskToEdit.id, task, dueDate, priority, description, dueTime);
    } else {
      onSubmit(task, dueDate, priority, description, dueTime);
    }
    setTask("");
    setDueDate(null);
    setDueTime("");
    setpriority("low");
    setDescription("");
    if (setTaskToEdit) setTaskToEdit(null);
    onClose();
  };

  useEffect(() => {
    if (isEditMode && taskToEdit) {
      setTask(taskToEdit.title || "");
      setDueDate(taskToEdit.due_date ? new Date(taskToEdit.due_date) : null);
      setpriority(taskToEdit.priority || "low");
      setDueTime(taskToEdit.due_time || "");
      setDescription(taskToEdit.description || "");
    }
  }, [taskToEdit]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-cardDark p-6 rounded-xl 
        shadow-[0_8px_30px_var(--color-CardShadows)] dark:shadow-[0_8px_30px_var(--color-CardShadowsDark)]
        w-[95%] max-w-lg border border-borderC dark:border-borderCDark animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-TextC dark:text-TextCDark tracking-tight">
            {isEditMode ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</label>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="What needs to be done?"
              className="bg-bground dark:bg-bgroundDark border-borderC dark:border-borderCDark 
              text-TextC dark:text-TextCDark focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-bground dark:bg-bgroundDark 
                    border-borderC dark:border-borderCDark text-TextC dark:text-TextCDark hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {dueDate ? format(dueDate, "MMM d, yyyy") : <span className="text-gray-400">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-borderC dark:border-borderCDark" align="start">
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    minDate={new Date()}
                    inline
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</label>
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="bg-bground dark:bg-bgroundDark border-borderC dark:border-borderCDark 
                text-TextC dark:text-TextCDark focus-visible:ring-primary/20 focus-visible:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              className="min-h-[100px] bg-bground dark:bg-bgroundDark border-borderC dark:border-borderCDark 
              text-TextC dark:text-TextCDark focus-visible:ring-primary/20 focus-visible:border-primary resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</label>
            <PriorityDropdown
              value={priority}
              onSelect={setpriority}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:text-TextC dark:hover:text-TextCDark hover:bg-gray-100 dark:hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary 
            text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
          >
            {isEditMode ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
