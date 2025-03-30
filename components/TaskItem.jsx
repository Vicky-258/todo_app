import { motion } from "framer-motion";
import { Trash, Pencil } from "lucide-react";

const TaskItem = ({ title, dueDate, priority }) => {
  const priorityColors = {
    high: "bg-redC dark:bg-redCDark",
    medium: "bg-orange-400 dark:bg-orange-500",
    low: "bg-accent dark:bg-accentDark",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="relative flex items-center justify-between p-3 sm:p-4 md:p-5 bg-card dark:bg-cardDark shadow-lg rounded-2xl border border-borderC dark:border-borderCDark w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl transition duration-500 ease-in-out"
    >
      {/* Priority Indicator */}
      <div
        className={`absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full ${priorityColors[priority]}`}
      ></div>

      {/* Task Info */}
      <div className="ml-6">
        <h3 className="text-lg sm:text-xl font-semibold font-cool text-TextC dark:text-TextCDark">
          {title}
        </h3>
        {dueDate && (
          <p className="font-cool text-sm sm:text-base text-TextC dark:text-TextCDark">
            Due: {dueDate}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-primary dark:hover:text-primaryDark">
          <Pencil size={16} />
        </button>
        <button className="p-1.5 sm:p-2 text-TextC dark:text-TextCDark hover:text-redC dark:hover:text-redCDark">
          <Trash size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
