import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TO DO App",
  description: "A Friendly TO DO App",
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body
        className="antialiased font-inter"
      >

        {children}
      </body>
    </html>
  );
}
