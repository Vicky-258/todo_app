import "./globals.css";
import { ThemeProvider } from "@/lib/context/ThemeContext";

export const metadata = {
  title: "OBSYDE",
  description: "Your mind, Organized.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full bg-bground dark:bg-bgroundDark text-TextC dark:text-TextCDark transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
