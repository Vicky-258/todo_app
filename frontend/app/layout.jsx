import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Navbar } from "@/components/navbar";
import { AmbientBackground } from "@/components/ui/ambient-background";

export const metadata = {
  title: "OBSYDE",
  description: "Your mind, Organized.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen font-sans bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AmbientBackground />
            <Navbar />
            <main className="pt-20 min-h-screen relative z-10">
              {children}
            </main>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}



