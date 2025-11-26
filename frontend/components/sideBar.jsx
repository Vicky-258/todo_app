import clsx from "clsx";
import { Moon, Sun, Calendar, CheckCircle, Circle, Inbox, LayoutGrid } from "lucide-react";
import { useDarkMode } from "@/lib/Hooks/useDarkMode";
import { useRef, useEffect } from "react";

export default function SideBar({ isOpen, setIsOpen, setFilterType }) {
  const sidebarRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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

  const menuItems = [
    { label: "All Tasks", value: "", icon: LayoutGrid },
    { label: "Today", value: "today", icon: Calendar },
    { label: "Upcoming", value: "upcoming", icon: Inbox },
    { label: "Uncompleted", value: "uncompleted", icon: Circle },
    { label: "Completed", value: "completed", icon: CheckCircle },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      <div
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 left-0 h-full w-64 z-50 flex flex-col",
          "bg-card dark:bg-cardDark border-r border-borderC dark:border-borderCDark",
          "transition-transform duration-300 cubic-bezier(0.2, 0, 0, 1)",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-borderC dark:border-borderCDark">
          <span className="text-lg font-bold tracking-tight text-TextC dark:text-TextCDark">
            OBSYDE
          </span>
        </div>

        <div className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold text-TextMuted uppercase tracking-wider mb-2">
              Filters
            </h3>
            {menuItems.map((item, index) => (
              <div key={item.value}>
                {index === 3 && <div className="my-2 h-px bg-borderC dark:bg-borderCDark mx-3" />}
                <button
                  onClick={() => {
                    setFilterType(item.value);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md
                  text-TextC dark:text-TextCDark hover:bg-primarySoft hover:text-primaryDark
                  transition-all duration-200 group"
                >
                  <item.icon size={18} className="text-TextMuted group-hover:text-primaryDark transition-colors" />
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-borderC dark:border-borderCDark">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg
            bg-bground dark:bg-bgroundDark border border-borderC dark:border-borderCDark
            text-TextC dark:text-TextCDark text-sm font-medium
            hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
