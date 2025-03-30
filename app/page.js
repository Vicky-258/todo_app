"use client";

import { useState } from "react";
import SideBar from "@/components/sideBar";
import TopSection from "@/components/TopSection";
import TaskItem from "@/components/TaskItem";

export default function Home() {

  
  const [isSideBarOpen, setisSideBarOpen] = useState(false);

  function HandlesidebarOpen() {
    
    setisSideBarOpen(!isSideBarOpen);

  }

  return (
    <div className="flex bg-bground dark:bg-bgroundDark min-h-screen transition duration-500 ease-in-out">
      <TopSection isOpen={isSideBarOpen} ToggleSideBar={HandlesidebarOpen} />
      <div className="flex-1 flex flex-col items-center pt-24 gap-4">
        <TaskItem
          title={"First Task"}
          dueDate={"04-01-2025"}
          priority={"high"}
        />
        <TaskItem
          title={"Second Task"}
          dueDate={"04-02-2025"}
          priority={"medium"}
        />
        <TaskItem
          title={"Third Task"}
          dueDate={"04-03-2025"}
          priority={"low"}
        />
      </div>
      <SideBar isOpen={isSideBarOpen} setIsOpen={setisSideBarOpen} />
    </div>
  );
}
