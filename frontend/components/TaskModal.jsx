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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className=" dark:bg-cardDark bg-card p-6 rounded-2xl shadow-2xl shadow-CardShadows dark:shadow-CardShadowsDark
        w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-TextC dark:text-TextCDark font-semibold mb-4 flex items-center gap-2">
          {isEditMode ? "Edit Task" : "New Task"}
        </h2>

        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Enter task..."
          className={
            "text-TextC dark:text-TextCDark focus-visible:ring-0 focus:ring-0 focus:outline-none"
          }
        />

        <div className="relative mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal hover:bg-transparent
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        text-TextC dark:text-TextCDark"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? (
                  format(dueDate, "dd/MM/yyyy")
                ) : (
                  <span>Pick a due date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-bground dark:bg-bgroundDark text-TextC dark:text-TextCDark"
              align="start"
            >
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                minDate={new Date()}
                inline
                dayClassName={(date) =>
                  date < new Date().setHours(0, 0, 0, 0)
                    ? "text-muted pointer-events-none opacity-40"
                    : undefined
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal hover:bg-transparent
          focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
          text-TextC dark:text-TextCDark"
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                {dueTime ? dueTime : <span>Pick a due time</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-4 bg-bground dark:bg-bgroundDark text-TextC dark:text-TextCDark"
              align="start"
            >
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="text-TextC dark:text-TextCDark bg-bground dark:bg-bgroundDark focus-visible:ring-0 focus:ring-0
                focus:outline-none"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a note or extra details..."
          className="mt-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg px-3 py-2
          text-sm focus-visible:ring-0 focus:ring-0 focus:outline-none
          text-TextC dark:text-TextCDark placeholder:text-muted-foreground border border-border dark:border-borderDark"
        />

        <PriorityDropdown
          value={priority}
          onSelect={setpriority}
          className={
            "mt-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          }
        />

        <Button
          onClick={handleSubmit}
          className="mt-6 w-full bg-primary dark:bg-primaryDark text-TextC dark:text-TextCDark"
        >
          Save Task
        </Button>
      </div>
    </div>
  );
};

export default TaskModal;
