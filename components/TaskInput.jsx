import { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [taskText, settaskText] = useState("");

  function handleChange(e) {
    settaskText(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && taskText.trim() !== "") {
      onAddTask(taskText);
      settaskText("");
    }
  }

  return (
    <input
      type="text"
      value={taskText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Add a new task..."
      className="px-18 md:px-40 py-3.5 bg-card dark:bg-cardDark 
              text-TextC dark:text-TextCDark
                shadow-lg rounded-2xl border border-borderC dark:border-borderCDark 
                w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl transition duration-300 ease-in-out
                focus:outline-1 focus:outline-borderC dark:focus:outline-borderCDark
                focus:shadow-CardShadows dark:focus:shadow-CardShadowsDark
                hover:shadow-CardShadows dark:hover:shadow-CardShadowsDark"
    />
  );
}
