import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function PriorityDropdown({ value, onSelect, className }) {
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between bg-bground dark:bg-bgroundDark border-borderC dark:border-borderCDark 
          text-TextC dark:text-TextCDark hover:bg-gray-50 dark:hover:bg-white/5 capitalize font-medium h-10 px-3 ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${priorityColors[value.toLowerCase()] || "bg-gray-400"}`} />
            {value}
          </div>
          <ChevronDown size={14} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-popover-trigger-width] bg-card dark:bg-cardDark border-borderC dark:border-borderCDark 
        shadow-[0_4px_12px_var(--color-CardShadows)] dark:shadow-[0_4px_12px_var(--color-CardShadowsDark)] p-1"
      >
        {["low", "medium", "high"].map((p) => (
          <DropdownMenuItem
            key={p}
            onClick={() => onSelect(p)}
            className="capitalize cursor-pointer rounded-md px-2 py-1.5 text-sm
            focus:bg-primarySoft focus:text-primaryDark dark:focus:bg-primarySoft dark:focus:text-primaryDark"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${priorityColors[p]}`} />
              {p}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}