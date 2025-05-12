import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun className="w-5 h-5" />
      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="w-10 h-5 bg-gray-200 dark:bg-gray-600 rounded-full relative cursor-pointer"
      >
        <Switch.Thumb className="w-5 h-5 bg-white dark:bg-gray-800 rounded-full transition-transform duration-200" />
      </Switch.Root>
      <Moon className="w-5 h-5" />
    </div>
  );
}
