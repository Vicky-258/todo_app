import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/lib/Hooks/useDarkMode";
import { useRef, useEffect } from "react";

export default function SideBar({ isOpen, setIsOpen, setFilterType }) {
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
        "fixed top-12 pl-4 pr-6 py-6 md:pr-32 h-[calc(100vh-3rem)] transition-transform duration-500 ease-in-out",
        "backdrop-blur-xl md:backdrop-blur-none rounded-b-lg text-TextC dark:text-TextCDark bg-bground dark:bg-bgroundDark",
        "z-50 w-64", // width
        isOpen ? "translate-x-0 left-0" : "-translate-x-full"
      )}
    >
      <ul className="flex flex-col gap-3 pt-8 px-2 font-pro font-medium text-TextC dark:text-TextCDark">
        <li
          className="p-2 rounded hover:bg-hoverLight dark:hover:bg-hoverDark cursor-pointer"
          onClick={() => setFilterType("")}
        >
          All
        </li>
        <li
          className="p-2 rounded hover:bg-hoverLight dark:hover:bg-hoverDark cursor-pointer"
          onClick={() => setFilterType("today")}
        >
          Today
        </li>
        <li
          className="p-2 rounded hover:bg-hoverLight dark:hover:bg-hoverDark cursor-pointer"
          onClick={() => setFilterType("upcoming")}
        >
          Upcoming
        </li>
        <hr className="my-2 border-borderC dark:border-borderCDark" />
        <li
          className="p-2 rounded hover:bg-hoverLight dark:hover:bg-hoverDark cursor-pointer"
          onClick={() => setFilterType("uncompleted")}
        >
          Uncompleted
        </li>
        <li
          className="p-2 rounded hover:bg-hoverLight dark:hover:bg-hoverDark cursor-pointer"
          onClick={() => setFilterType("completed")}
        >
          Completed
        </li>
      </ul>

      <div className="w-full absolute bottom-16 md:bottom-4 flex justify-between items-center">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={26} /> : <Moon size={26} />}
        </button>
      </div>
    </div>
  );
}
