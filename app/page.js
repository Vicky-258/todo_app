"use client";

import { useState } from "react";
import Sidebar from "@/components/sideBar";
import TaskList from "@/components/taskList";
import TopSection from "@/components/TopSection";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col  bg-bground dark:bg-bgroundDark min-h-screen transition-discrete duration-500 opacity-100 dark:opacity-95">
      <TopSection toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>

  );
}
