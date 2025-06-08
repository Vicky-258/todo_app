"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, PencilIcon } from "lucide-react";
import PriorityDropdown from "./PriorityDropdown";
import { Calendar } from "./ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns"; // To format date

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setpriority] = useState("low");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(task, dueDate, priority, description);
    setTask("");
    onClose();
  };

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
          📝 New Task
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

        <div className="relative mt-0.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-4 hover:bg-transparent focus-visible:border-ring
                focus-visible:ring-ring/50 focus-visible:ring-[3px]
                 text-TextC dark:text-TextCDark"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? (
                  format(dueDate, "PPP")
                ) : (
                  <span>Pick a due date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-bground dark:bg-bgroundDark text-TextC dark:text-TextCDark"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
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
