"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile, loginUser, logoutUser, registerUser } from "@/lib/api";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            try {
                // Check if we have a token (cookie is handled by browser/axios)
                // We can try to fetch profile
                const profile = await fetchUserProfile();
                setUser(profile);
            } catch (error) {
                // Not logged in or token expired
                console.log("Not logged in");
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await loginUser(credentials);
            setUser(data.user);
            toast.success("Welcome back!");
            router.push("/dashboard");
            return data;
        } catch (error) {
            toast.error("Login failed");
            throw error;
        }
    };

    const register = async (credentials) => {
        try {
            const data = await registerUser(credentials);
            // registerUser in api.js calls loginUser internally and returns its result
            setUser(data.user);
            toast.success("Account created!");
            router.push("/dashboard");
            return data;
        } catch (error) {
            toast.error("Registration failed");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            router.push("/auth/login");
            toast.success("Logged out");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
