// lib/hooks/useDarkMode.js
import { useTheme } from "@/lib/context/ThemeContext";

// Alias hook to context-based one (backward compatibility)
export const useDarkMode = () => {
  return useTheme();
};
