import axios from "axios";

export const refreshToken = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.error("❌ Refresh token failed:", error);
    return false;
  }
};

export const logoutRequest = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/users/logout/", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res;
};