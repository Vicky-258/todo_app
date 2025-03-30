import clsx from "clsx";
import { Moon, Sun} from "lucide-react";
import { useDarkMode } from "@/app/Hooks/useDarkMode";
import { useRef, useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
import ProfilePic from "@/public/ProfilePic.jpg";

export default function SideBar({ isOpen, setIsOpen }) {
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

  return (
    <div
      ref={sidebarRef}
      className={clsx(
        "absolute top-12 pl-4 pr-6 py-4 md:pr-32 h-[calc(100vh-3rem)] transition-transform duration-500 ease-in-out",
        "backdrop-blur-xl md:backdrop-blur-none rounded-b-lg text-TextC dark:text-TextCDark",
        isOpen ? "translate-x-0" : "-translate-x-64"
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
        <div className="md:invisible md:pointer-">
          <ProfileIcon className="visible md:invisible md:pointer-events-none" src={ProfilePic}/>
        </div>
      </div>
    </div>
  );
}
