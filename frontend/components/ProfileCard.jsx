"use client";

import { PencilIcon } from "lucide-react";

const ProfileCard = ({ icon: Icon, label, value, onClick }) => {
  return (
    <div
      className="justify-between bg-card dark:bg-cardDark border border-borderC dark:border-borderCDark
      rounded-2xl px-5 py-4 shadow-md flex flex-col gap-1 w-full
      hover:shadow-lg transition-shadow duration-300 cursor-pointer min-h-[90px]"
    >
      <div className="flex items-center justify-between min-h-fit">
        <div className="flex items-center gap-3">
          <Icon className="text-xl text-TextC dark:text-TextCDark" />
          <span className="text-sm font-semibold text-TextC dark:text-TextCDark">
            {label}
          </span>
        </div>
        <button
          onClick={onClick}
          className="text-primary dark:text-primaryDark text-sm hover:text-blue-400
          transition-transform hover:scale-105"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>

      {value && (
        <div className="ml-8 text-sm text-gray-400 dark:text-gray-500 truncate">
          {value}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;