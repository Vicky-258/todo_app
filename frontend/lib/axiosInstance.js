import axios from "axios";
import { refreshToken } from "./taskService"; // Make sure this path is correct
import useLogout from "@/lib/hooks/useLogout"; // Optional if you use hook logic here

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // Important for cookies!
});

// Flag to avoid infinite loops
let isRefreshing = false;

// ⛔ For requests
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await refreshToken();
        isRefreshing = false;

        if (refreshed) {
          return axiosInstance(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        isRefreshing = false;
        console.error("Refresh token failed");

        // ❌ Optional: Auto logout
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
