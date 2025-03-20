import { Home, ListCheck, User } from "lucide-react";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`bg-gray-100 dark:bg-neutral-900 text-white h-screen w-64 fixed
        transition-discrete duration-500 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav className="mt-4 space-y-2 p-2">
        <SidebarItem icon={<Home />} text="Home" isOpen={isOpen} />
        <SidebarItem icon={<ListCheck />} text="Tasks" isOpen={isOpen} />
      </nav>
    </div>
  );
}


const SidebarItem = ({ icon, text, isOpen }) => (
  <div className="flex items-center gap-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md dark:text-white text-black">
    {icon}
    {isOpen && <span>{text}</span>}
  </div>
);

