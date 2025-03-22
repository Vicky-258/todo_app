"use client";

import { useState } from "react";
import Sidebar from "@/components/sideBar";
import TaskList from "@/components/taskList";
import TopSection from "@/components/TopSection";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col  bg-gray-100 dark:bg-neutral-900 min-h-screen transition-discrete duration-500 opacity-100 dark:opacity-95">
      <TopSection toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 h-full">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 flex justify-center items-start p-4">
          <TaskList />
        </div>
      </div>
    </div>

  );
}
