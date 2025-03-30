import { User } from "lucide-react";
import Image from "next/image";

export default function ProfileIcon({ src, onClick, className = "" }) {
  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 dark:border-gray-600
                  flex items-center justify-center overflow-hidden cursor-pointer transition-opacity duration-300
                  ${className}`}
    >
      {src ? (
        <Image src={src} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <User className="text-gray-500 dark:text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
      )}
    </div>
  );
}
