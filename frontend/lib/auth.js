import axiosInstance from "./axiosInstance";

export const refreshToken = async () => {
  try {
    await axiosInstance.post("/api/token/refresh/");
    return true;
  } catch (error) {
    console.error("❌ Refresh token failed:", error);
    return false;
  }
};

export const logoutRequest = async () => {
  try {
    const res = await axiosInstance.post("/api/users/logout/");
    return res;
  } catch (err) {
    console.error("❌ Logout failed:", err);
    throw err;
  }
};
