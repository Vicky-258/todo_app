"use client";

import { useDarkMode } from "@/lib/Hooks/useDarkMode";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  useDarkMode();

  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!form.username) {
      toast.error("🚫 Username is required!");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || !emailPattern.test(form.email)) {
      toast.error("🚫 Please enter a valid email address!");
      return;
    }

    if (!form.password || form.password.length < 6) {
      toast.error("🚫 Password must be at least 6 characters!");
      return;
    }

    // If validation passed, proceed with the API request
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        form,
        { withCredentials: true } // 👈 Needed to allow cookies
      );

      // Store only safe user info (optional)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Clear the form after successful registration
      setForm({ username: "", email: "", password: "" });

      // Redirect to login or dashboard page
      router.push("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Registration failed. Try again!";
      toast.error(`🚫 ${errorMsg}`);
    }
  };

  return (
    <div className="bg-card dark:bg-cardDark p-8 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-TextC dark:text-TextCDark">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-TextC dark:text-TextCDark"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 border border-borderC dark:border-borderCDark
             rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accentDark"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
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
          Create Account
        </button>
        <p className="text-gray-400">Already registered? <Link href="/auth/login" className="text-primary dark:text-primaryDark">Login</Link></p>
      </form>
    </div>
  );
}
