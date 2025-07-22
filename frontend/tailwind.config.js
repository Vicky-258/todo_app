/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [],
  safelist: [
    "grid-cols-7",
    "grid",
    "text-center",
    "text-sm",
    "p-1",
    "h-9",
    "w-9",
    "rounded-md",
    "hover:bg-accent",
    "bg-muted",
    "text-muted-foreground",
  ],
};
