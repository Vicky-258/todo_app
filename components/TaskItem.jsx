import { Trash, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TaskItem = ({ TaskId, title, dueDate, priority, deleteTask, updateTask }) => {
  const priorityColors = {
    high: "bg-redC dark:bg-redCDark",
    medium: "bg-yellow-400 dark:bg-yellow-500",
    low: "bg-accent dark:bg-accentDark",
  };
  const taskItemRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDueDate, setEditedDueDate] = useState(dueDate || "");
  const [editedPriority, setEditedPriority] = useState(priority || "low");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskItemRef.current && !taskItemRef.current.contains(event.target)) {
        setIsEditing(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriorityChange = () => {
    if (!isEditing) return;

    const newPriority =
      editedPriority === "high"
        ? "medium"
        : editedPriority === "medium"
        ? "low"
        : "high";
    setEditedPriority(newPriority);
    updateTask(TaskId, title, dueDate, newPriority); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      updateTask(TaskId, editedTitle, editedDueDate, editedPriority);
    }
  };

  function handleSave() {

    updateTask(TaskId, editedTitle, editedDueDate, editedPriority);
    setIsEditing(false);

  }

  return (
    <div
      ref={taskItemRef}
      className="relative flex items-center justify-between
             p-3 sm:p-4 md:p-5 bg-card dark:bg-cardDark
             shadow-lg rounded-2xl border border-borderC
             dark:border-borderCDark w-full max-w-sm sm:max-w-md
             md:max-w-lg lg:max-w-xl transition duration-500
             ease-in-out hover:shadow-CardShadows dark:hover:shadow-CardShadowsDark"
    >
      {/* Priority Indicator */}
      <div
        className={`absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer ${priorityColors[priority]}`}
        onClick={handlePriorityChange}
        style={{ opacity: isEditing ? 1 : 0.7 }}
      ></div>

      {/* Task Info */}
      <div className="ml-6">
        {isEditing ? (
          <input
            className="text-lg sm:text-xl font-semibold font-cool text-TextC dark:text-TextCDark bg-transparent border-b-2 border-primary outline-none"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <h3 className="text-lg sm:text-xl font-semibold font-cool text-TextC dark:text-TextCDark">
            {title}
          </h3>
        )}

        {isEditing ? (
          <input
            type="date"
            className="font-cool text-sm sm:text-base text-TextC dark:text-TextCDark bg-transparent border-b-2 border-primary outline-none"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
        ) : (
          <p className="font-cool text-sm sm:text-base text-TextC dark:text-TextCDark">
            {dueDate ? `Due: ${dueDate}` : "Due date not defined"}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-primary dark:hover:text-primaryDark"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-primary dark:hover:text-primaryDark"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} />
          </button>
        )}

        <button
          className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-redC
                         dark:hover:text-redCDark"
          onClick={() => deleteTask(TaskId)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
