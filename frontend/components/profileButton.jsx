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
        className={`relative inline-block text-left${className}`}
        ref={menuRef}
      >
        <div onClick={() => setIsOpen(!isOpen)}>
          <ProfileIcon src={imageSrc} className="w-10 h-10" />
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-bground dark:bg-bgroundDark rounded-md shadow-lg z-50">
            <ul className="py-1 text-sm text-TextC dark:text-TextCDark">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-bground dark:hover:bg-bgroundDark rounded-md"
                >
                  Profile Page
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-bground dark:hover:bg-bgroundDark rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}
