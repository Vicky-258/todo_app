"use client";
import EmptyState from "./EmptyState";
import TaskItemCard from "@/components/TaskItemCard";
import { updateTaskStatus } from "@/services/taskService";

export default function TaskGrid({
  tasks,
  deleteTask,
  updateTask,
  onCardClick,
  modelOpen = false,
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[calc(100vh-10rem)]">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
          {tasks.map((task) => (
            <TaskItemCard
              key={task.id}
              TaskId={task.id}
              title={task.title}
              dueDate={task.due_date}
              dueTime={task.due_time}
              priority={task.priority}
              deleteTask={deleteTask}
              updateTask={updateTask}
              onclick={onCardClick}
              modelOpen={modelOpen}
              isCompleted={task.is_completed}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
