import axios from "axios";
import { refreshToken } from "./auth";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  withCredentials: true,
});


let isRefreshing = false;

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
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        isRefreshing = false;
        console.error("🔒 Refresh token failed, redirecting to login");

        if (
          typeof window !== "undefined" &&
          !originalRequest.url.includes("/profile")
        ) {
          toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
