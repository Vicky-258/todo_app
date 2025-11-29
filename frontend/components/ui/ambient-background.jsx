"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AmbientBackground() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Base Background Layer */}
            <div
                className={`absolute inset-0 transition-colors duration-1000 ${isDark
                        ? "bg-[hsl(222,47%,8%)]"
                        : "bg-[hsl(210,40%,98%)]"
                    }`}
            />

            {/* Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] mix-blend-screen ${isDark
                        ? "bg-blue-900/30"
                        : "bg-blue-200/40"
                    }`}
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen ${isDark
                        ? "bg-purple-900/20"
                        : "bg-purple-200/40"
                    }`}
            />

            {/* Chrome / Glass Shapes (Subtle) */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={`absolute top-[20%] right-[15%] w-64 h-64 rounded-full border opacity-10 blur-xl ${isDark ? "border-white/20 bg-white/5" : "border-blue-500/20 bg-blue-500/5"
                    }`}
            />

            {/* Bokeh Particles (Optional - keep minimal) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}
