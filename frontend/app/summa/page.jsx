"use client";

import TaskItemCard from "@/components/TaskItemCard";

export default function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bground dark:bg-bgroundDark">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
        <TaskItemCard
          TaskId={1}
          title="Finish MindLens Model"
          dueDate="2025-07-08"
          priority="High"
          isCompleted={false}
          deleteTask={() => console.log("Delete Task 1")}
          updateTask={() => console.log("Update Task 1")}
        />
        <TaskItemCard
          TaskId={2}
          title="Push Inventory Refactor"
          dueDate="2025-07-10"
          priority="Medium"
          isCompleted={true}
          deleteTask={() => console.log("Delete Task 2")}
          updateTask={() => console.log("Update Task 2")}
        />
        <TaskItemCard
          TaskId={3}
          title="Design Task Manager UI"
          dueDate="2025-07-12"
          priority="Low"
          isCompleted={false}
          deleteTask={() => console.log("Delete Task 3")}
          updateTask={() => console.log("Update Task 3")}
        />
        <TaskItemCard
          TaskId={4}
          title="Chain-of-Thought Analyzer Update"
          dueDate="2025-07-15"
          priority="High"
          isCompleted={false}
          deleteTask={() => console.log("Delete Task 4")}
          updateTask={() => console.log("Update Task 4")}
        />
        <TaskItemCard
          TaskId={5}
          title="Refine Keyword Weight JSON"
          dueDate="2025-07-17"
          priority="Medium"
          isCompleted={true}
          deleteTask={() => console.log("Delete Task 5")}
          updateTask={() => console.log("Update Task 5")}
        />
      </div>
    </div>
  );
}
