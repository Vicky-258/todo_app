"use client";

// app/auth/layout.jsx
import ClientToaster from "@/components/ClientToaster";

export default function AuthLayout({ children }) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-bground dark:bg-bgroundDark transition duration-500 ease-in-out">        {children}
        <ClientToaster />
    </div>
  );
}
