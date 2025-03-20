"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";

export default function TopSection({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleDarkModeToggle = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-neutral-900 transition-discrete duration-500">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <Menu size={24} className="text-black dark:text-white" />
      </button>

      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        To-Do App
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDarkModeToggle}
          className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun size={24} className="text-black dark:text-white" />
          ) : (
            <Moon size={24} className="text-black dark:text-white" />
          )}
        </button>

        <button className="p-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Logout
        </button>
      </div>
    </div>
  );
};

