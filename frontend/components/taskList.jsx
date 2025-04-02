import TaskItem from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TaskList({ tasks, deleteTask, updateTask }) {

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  
  return (
    <div className="flex-1 flex flex-col items-center pt-8 w-full gap-4
    overflow-hidden" ref={parent}>
      {
        tasks.length == 0 ? (
          <p className="dark:text-TextCDark text-TextC text-5xl">No Tasks 🎉</p>
        ) :
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                TaskId={task.id}
                title={task.title}
                dueDate={task.dueDate}
                priority={task.priority}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))   
      }
    </div>
  );
}
