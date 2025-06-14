
"use client";

import { logoutRequest } from "@/lib/auth";

export default function useLogout() {
  const logout = async () => {
    try {
      await logoutRequest();
      window.location.href = "/auth/login"; 
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return logout;
}
