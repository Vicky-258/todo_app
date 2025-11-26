"use client";

import { useState, useRef, useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
import Link from "next/link";
import useLogout from "@/hooks/uselogout";

export default function ProfileButton({ imageSrc, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const logout = useLogout();

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={menuRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200 focus:outline-none"
      >
        <ProfileIcon src={imageSrc} className="w-9 h-9 object-cover rounded-full shadow-sm border border-borderC dark:border-borderCDark" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card dark:bg-cardDark rounded-xl 
            shadow-[0_4px_20px_var(--color-CardShadows)] dark:shadow-[0_4px_20px_var(--color-CardShadowsDark)]
            border border-borderC dark:border-borderCDark py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="px-4 py-3 border-b border-borderC dark:border-borderCDark mb-1">
            <p className="text-xs font-semibold text-TextMuted uppercase tracking-wider">Account</p>
          </div>
          <ul className="text-sm text-TextC dark:text-TextCDark">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2.5 hover:bg-primarySoft hover:text-primaryDark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2.5 hover:bg-redC/10 text-redC dark:text-redCDark transition-colors"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
