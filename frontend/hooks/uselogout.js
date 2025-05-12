// hooks/useLogout.js
"use client";

export default function useLogout() {
  const logout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/logout/", {
        method: "POST",
        credentials: "include", // important for sending cookies
      });
      if (res.ok) {
        window.location.href = "/auth/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return logout;
}
