import {

    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,

} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function PriorityDropdown({value, onSelect, className }) {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className={`text-TextC dark:text-TextCDark ${className}`}>{value}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={"text-TextC dark:text-TextCDark bg-bground dark:bg-bgroundDark"}>
          <DropdownMenuItem onClick={() => onSelect("low")}>
            Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect("medium")}>
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect("high")}>
            High
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}