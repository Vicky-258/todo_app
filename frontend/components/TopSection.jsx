import ProfileButton from "./profileButton";
import { fetchUserProfile } from "@/services/userService";
import { Menu, Search } from "lucide-react"
import { useState, useEffect } from "react";

export default function TopSection({ isOpen, ToggleSideBar }) {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        console.error("💥 Couldn't load profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);


  return (
    <header className="sticky top-0 z-30 w-full px-4 sm:px-6 lg:px-8 py-4
      bg-bground/80 dark:bg-bgroundDark/80 backdrop-blur-xl border-b border-borderC dark:border-borderCDark">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={ToggleSideBar}
            className="p-2 -ml-2 rounded-md text-TextMuted hover:text-TextC dark:hover:text-TextCDark 
            hover:bg-primarySoft transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar Placeholder - Raycast style */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md 
            bg-card dark:bg-cardDark border border-borderC dark:border-borderCDark
            text-sm text-TextMuted w-64 hover:border-primary/50 transition-colors cursor-text">
            <Search size={14} />
            <span>Search tasks...</span>
            <kbd className="ml-auto text-[10px] font-mono bg-bground dark:bg-bgroundDark px-1.5 py-0.5 rounded border border-borderC dark:border-borderCDark">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-xs font-medium text-TextMuted">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="h-4 w-px bg-borderC dark:bg-borderCDark hidden sm:block" />
          <ProfileButton
            key={user?.ProfilePic || "default"}
            {...(!loading ? { imageSrc: user?.profilePic } : {})}
          />
        </div>
      </div>
    </header>
  );
}
