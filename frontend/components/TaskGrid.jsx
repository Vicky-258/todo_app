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
    <div className="w-full h-full">
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-[400px]">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full auto-rows-fr pb-20">
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
