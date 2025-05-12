import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TaskList({ tasks, deleteTask, updateTask }) {

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  
  return (
    <div className="flex-1 flex flex-col items-center pt-8 w-full gap-4
    overflow-hidden" ref={parent}>
      {
        tasks.length == 0 ? (
          <EmptyState />
        ) :
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                TaskId={task.id}
                title={task.title}
                dueDate={task.due_date}
                priority={task.priority}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))   
      }
    </div>
  );
}
