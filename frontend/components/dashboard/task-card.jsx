"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function TaskCard({ task, onClick, onToggleStatus }) {
    const [isCompleting, setIsCompleting] = useState(false)

    const priorityStyles = {
        High: "border-l-red-500/50 shadow-[0_0_20px_-10px_rgba(239,68,68,0.3)]",
        Medium: "border-l-amber-500/50 shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)]",
        Low: "border-l-emerald-500/50 shadow-[0_0_20px_-10px_rgba(16,185,129,0.3)]",
    }

    const priorityBadges = {
        High: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200/20",
        Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/20",
        Low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/20",
    }

    const handleCheck = (checked) => {
        if (checked) {
            setIsCompleting(true)
            // Delay the actual status update slightly to show the animation
            setTimeout(() => {
                onToggleStatus(task.id, checked)
                setIsCompleting(false)
            }, 800)
        } else {
            onToggleStatus(task.id, checked)
        }
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
                opacity: task.is_completed ? 0.6 : 1,
                y: 0,
                scale: 1,
                filter: task.is_completed ? "grayscale(0.8) blur(0.5px)" : "grayscale(0) blur(0px)"
            }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => onClick(task)}
            className="cursor-pointer group h-full"
        >
            <Card className={cn(
                "relative overflow-hidden border-0 border-l-[3px] transition-all duration-500 h-full flex flex-col",
                "bg-white/40 dark:bg-[#1e293b]/40 backdrop-blur-md border-white/20 dark:border-white/5",
                "hover:shadow-xl hover:bg-white/60 dark:hover:bg-[#1e293b]/60",
                task.is_completed ? "border-l-gray-400/30" : priorityStyles[task.priority] || priorityStyles.Low
            )}>
                {/* Idle Pulse Gradient */}
                {!task.is_completed && (
                    <motion.div
                        animate={{ opacity: [0.01, 0.03, 0.01] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none"
                    />
                )}

                {/* Hover Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />

                {/* Completion Glow Ripple */}
                <AnimatePresence>
                    {isCompleting && (
                        <motion.div
                            initial={{ opacity: 0.5, scale: 0, x: "-50%", y: "-50%", left: "2rem", top: "2rem" }}
                            animate={{ opacity: 0, scale: 4 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute w-32 h-32 bg-primary/30 rounded-full z-0 pointer-events-none blur-xl"
                        />
                    )}
                </AnimatePresence>

                <CardHeader className="p-5 pb-2 flex flex-row items-start gap-4 space-y-0 relative z-10">
                    <div onClick={(e) => e.stopPropagation()} className="pt-1">
                        <motion.div whileTap={{ scale: 0.8 }}>
                            <Checkbox
                                checked={task.is_completed || isCompleting}
                                onCheckedChange={handleCheck}
                                className={cn(
                                    "h-5 w-5 border-2 transition-all duration-300 rounded-full", // Rounded checkbox for modern feel
                                    "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:shadow-[0_0_10px_rgba(var(--primary),0.5)]",
                                    "border-muted-foreground/30 hover:border-primary/50"
                                )}
                            />
                        </motion.div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="relative">
                            <h3 className={cn(
                                "font-semibold leading-tight truncate transition-all duration-300 text-base",
                                (task.is_completed || isCompleting) && "text-muted-foreground"
                            )}>
                                {task.title}
                            </h3>
                            {/* Animated Strikethrough Line */}
                            <motion.div
                                initial={false}
                                animate={{
                                    width: (task.is_completed || isCompleting) ? "100%" : "0%"
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute top-1/2 left-0 h-[2px] bg-muted-foreground/50 pointer-events-none"
                            />
                        </div>

                        {task.description && (
                            <p className="text-sm text-muted-foreground/80 line-clamp-2 font-light">
                                {task.description}
                            </p>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-5 pt-2 relative z-10 mt-auto">
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                        <span className={cn(
                            "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm",
                            priorityBadges[task.priority] || priorityBadges.Low
                        )}>
                            {task.priority}
                        </span>

                        {(task.due_date || task.due_time) && (
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                {task.due_date && (
                                    <span className={cn(
                                        "flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/30 border border-white/5",
                                        // Highlight if due today/tomorrow logic could go here
                                    )}>
                                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                                        {format(new Date(task.due_date), "MMM d")}
                                    </span>
                                )}
                                {task.due_time && (
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/30 border border-white/5">
                                        <Clock className="h-3.5 w-3.5 opacity-70" />
                                        {task.due_time}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
