import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/lib/Hooks/useDarkMode";
import { useRef, useEffect } from "react";

export default function SideBar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);
  const { isDarkMode, toggleDarkMode, ready } = useDarkMode();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.id !== "menu-button"
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={clsx(
        "fixed top-12 pl-4 pr-6 py-4 md:pr-32 h-[calc(100vh-3rem)] transition-transform duration-500 ease-in-out",
        "backdrop-blur-xl md:backdrop-blur-none rounded-b-lg text-TextC dark:text-TextCDark bg-bground dark:bg-bgroundDark" ,
        "z-50", // Keep this to ensure it stays on top!
        "w-64", // <--- Use your desired WIDTH here, if not w-64, change it!
        isOpen ? "translate-x-0 left-0" : "-translate-x-full" // <--- IMPORTANT: Changed -translate-x-64 to -translate-x-full and added left-0
      )}
    >
      <ul className="flex flex-col space-y-4 text-TextC dark:text-TextCDark font-pro font-medium">
        <li className="p-2">Today</li>
        <li className="p-2">Upcoming</li>
        <li className="p-2">Completed</li>
      </ul>

      <div className="w-full absolute bottom-16 md:bottom-4 flex justify-between items-center">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={26} /> : <Moon size={26} />}
        </button>
      </div>
    </div>
  );
}
