import "./globals.css";
import { ThemeProvider } from "@/lib/context/ThemeContext";


export const metadata = {
  title: "TO DO App",
  description: "A Friendly TO DO App",
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
