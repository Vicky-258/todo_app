"use client";
import { useDarkMode } from "@/lib/Hooks/useDarkMode";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function loginPage() {
  const router = useRouter();
  useDarkMode();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || !emailPattern.test(form.email)) {
      toast.error("🚫 Please enter a valid email address!");
      return;
    }

    if (!form.password || form.password.length < 6) {
      toast.error("🚫 Password must be at least 6 characters!");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        form,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Clear the form after successful registration
      setForm({ email: "", password: "" });

      // Redirect to login or dashboard page
      router.push("/"); // Adjust this to your desired path
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error Occured. Try again!";
      toast.error(`🚫 ${errorMsg}`);
    }
  };

  return (
    <div className="bg-card dark:bg-cardDark p-8 rounded-2xl shadow-md w-full max-w-sm items-center">
      <h2 className="text-2xl font-bold mb-6 text-center text-TextC dark:text-TextCDark">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-TextC dark:text-TextCDark"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-borderC dark:border-borderCDark
             rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accentDark"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-borderC dark:border-borderCDark
             rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accentDark"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 dark:bg-primaryDark text-white py-3 rounded-lg font-semibold transition duration-300 cursor-pointer"
        >
          Login
        </button>
        <p className="text-gray-400">New User? <Link href="/auth/register" className="text-primary
        dark:text-primaryDark">register</Link>
        </p>
      </form>
    </div>
  );
}
