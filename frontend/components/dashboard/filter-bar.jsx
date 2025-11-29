"use client"

import { Search, Filter, SortAsc, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function FilterBar({
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy
}) {
    const activeFiltersCount = (filterPriority !== "All" ? 1 : 0) + (filterStatus !== "All" ? 1 : 0)

    const clearFilters = () => {
        setFilterPriority("All")
        setFilterStatus("All")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8 p-2 rounded-2xl glass-card items-center relative z-20"
        >
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-transparent focus:bg-white/10 transition-all rounded-xl h-11"
                />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-white/5 border-transparent hover:bg-white/10 rounded-xl h-11 px-4">
                            <Filter className="mr-2 h-4 w-4 opacity-70" />
                            Filter
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px] bg-primary/20 text-primary">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-card border-white/10">
                        <DropdownMenuLabel>Priority</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem checked={filterPriority === "All"} onCheckedChange={() => setFilterPriority("All")}>
                            All Priorities
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filterPriority === "High"} onCheckedChange={() => setFilterPriority("High")}>
                            High
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filterPriority === "Medium"} onCheckedChange={() => setFilterPriority("Medium")}>
                            Medium
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filterPriority === "Low"} onCheckedChange={() => setFilterPriority("Low")}>
                            Low
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuSeparator className="bg-white/10" />

                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem checked={filterStatus === "All"} onCheckedChange={() => setFilterStatus("All")}>
                            All Statuses
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filterStatus === "Completed"} onCheckedChange={() => setFilterStatus("Completed")}>
                            Completed
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filterStatus === "Pending"} onCheckedChange={() => setFilterStatus("Pending")}>
                            Pending
                        </DropdownMenuCheckboxItem>

                        {activeFiltersCount > 0 && (
                            <>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem onClick={clearFilters} className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
                                    <X className="mr-2 h-4 w-4" />
                                    Clear Filters
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-white/5 border-transparent hover:bg-white/10 rounded-xl h-11 px-4">
                            <SortAsc className="mr-2 h-4 w-4 opacity-70" />
                            Sort: {sortBy.replace("_", " ")}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-card border-white/10">
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSortBy("newest")}>
                            Newest Created
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                            Oldest Created
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => setSortBy("priority_high")}>
                            Priority (High First)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("deadline_soonest")}>
                            Deadline (Soonest)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => setSortBy("a_z")}>
                            Title (A-Z)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    )
}
