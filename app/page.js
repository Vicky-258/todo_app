"use client";

import { useState } from "react";
import Sidebar from "@/components/sideBar";
import TaskItem from "@/components/TaskItem";
import TopSection from "@/components/TopSection";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col  bg-gray-100 dark:bg-neutral-900 h-screen transition-discrete duration-500 opacity-100 dark:opacity-95">
      <TopSection toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 flex justify-center items-center p-4">
          <TaskItem
            title="Finish React Project"
            dueDate="March 25, 2025"
            priority="high"
            onEdit={() => console.log("Edit clicked")}
            onDelete={() => console.log("Delete clicked")}
          />
        </div>
      </div>
    </div>
  );
}
