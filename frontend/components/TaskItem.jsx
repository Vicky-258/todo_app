import { Trash, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskItem = ({ TaskId, title, dueDate, priority, deleteTask, updateTask }) => {
  const priorityColors = {
    high: "bg-redC dark:bg-redCDark",
    medium: "bg-yellow-400 dark:bg-yellow-500",
    low: "bg-green-400 dark:bg-green-500",
  };
  const taskItemRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDueDate, setEditedDueDate] = useState(dueDate ? new Date(dueDate) : null);
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
        className={`absolute top-2 left-2 w-2 h-2 sm:w-2 sm:h-2 rounded-full cursor-pointer ${priorityColors[priority.toLowerCase()]}`}
        onClick={handlePriorityChange}
        style={{ opacity: isEditing ? 1 : 0.7 }}
        title={priority}
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
          <DatePicker
            selected={new Date(editedDueDate)}
            onChange={(date) => setEditedDueDate(date)}
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            yearItemNumber={5} // Limit the number of years shown in the dropdown
            className="font-cool text-sm sm:text-base text-TextC dark:text-TextCDark bg-transparent border-b-2 border-primary outline-none"
            dropdownMode="select" // Make the dropdowns work via select mode
            showIcon={true}        />
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
              title="Edit Task"
          >
            <Pencil size={16} />
          </button>
        )}

        <button
          className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-redC
                         dark:hover:text-redCDark"
          onClick={() => deleteTask(TaskId)}
          title="Delete Task"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
