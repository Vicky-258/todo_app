"use client"

import { format } from "date-fns"
import { Calendar, Clock, Flag, Trash, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function TaskDrawer({ task, isOpen, onClose, onEdit, onDelete }) {
    if (!task) return null

    const priorityColors = {
        High: "bg-red-500/10 text-red-500 border-red-500/20",
        Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Low: "bg-green-500/10 text-green-500 border-green-500/20",
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                        <Badge variant="outline" className={cn("px-3 py-1", priorityColors[task.priority])}>
                            {task.priority} Priority
                        </Badge>
                    </div>
                    <SheetTitle className="text-2xl font-bold leading-tight">
                        {task.title}
                    </SheetTitle>
                    <SheetDescription className="text-base">
                        Created on {format(new Date(task.created_at), "PPP")}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-6">
                    {/* Description */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Description</h4>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                            {task.description || "No description provided."}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Calendar className="h-4 w-4" />
                                <span>Due Date</span>
                            </div>
                            <p className="font-medium">
                                {task.due_date ? format(new Date(task.due_date), "PPP") : "No due date"}
                            </p>
                        </div>

                        <div className="space-y-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Clock className="h-4 w-4" />
                                <span>Time</span>
                            </div>
                            <p className="font-medium">
                                {task.due_time || "No time set"}
                            </p>
                        </div>
                    </div>
                </div>

                <SheetFooter className="mt-10 flex-col sm:flex-row gap-3 sm:gap-2">
                    <Button
                        onClick={() => {
                            onEdit(task)
                            onClose()
                        }}
                        className="w-full sm:w-auto glass-button"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Task
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onDelete(task.id)
                            onClose()
                        }}
                        className="w-full sm:w-auto"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
