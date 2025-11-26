import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const EmptyState = () => {
  const morningQuotes = [
    "Good morning! Time to conquer the day 🌅",
    "Start fresh — what will you achieve today? 🔥",
    "Sun’s up, time to rise up! ☀️",
  ];
  const afternoonQuotes = [
    "Keep going champ 💪",
    "Use the sun while it shines 🕑",
    "You’re halfway to glory 🚀",
  ];
  const eveningQuotes = [
    "Evening peace mode activated 🌙",
    "All done? Then breathe and relax ☁️",
    "Even the stars need rest ✨",
  ];
  const wildcards = [
    "A wise man once said... 'why one when you can have all' 🧠",
    "Looks empty in here. Tap + to add a quest.",
    "All clear! Use this moment to reflect or plan ahead. 🧘‍♂️",
    "You've conquered the list like a boss 💼",
    "This must be what peace feels like ☁️",
    "Reward yourself with a cookie 🍪 You earned it.",
    "No battles today, warrior. Rest up ⚔️",
    "Silence... too silent. Start planning maybe?",
    "Greatness begins with an empty list 📜",
  ];

  const getTimeBasedMessages = () => {
    const hour = new Date().getHours();
    if (hour < 12) return morningQuotes;
    else if (hour < 18) return afternoonQuotes;
    else return eveningQuotes;
  };

  const getRandomMessage = () => {
    const themed = getTimeBasedMessages();
    return [...themed, ...wildcards][
      Math.floor(Math.random() * (themed.length + wildcards.length))
    ];
  };

  const [message, setMessage] = useState(""); // empty initially

  // set on mount (client only)
  useEffect(() => {
    setMessage(getRandomMessage());
  }, []);

  const refreshMessage = () => {
    setMessage(getRandomMessage());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 mb-6 rounded-2xl bg-bground dark:bg-bgroundDark border border-borderC dark:border-borderCDark 
        flex items-center justify-center text-primary dark:text-primaryDark shadow-sm">
        <Sparkles size={32} strokeWidth={1.5} />
      </div>
      <p className="text-lg font-medium text-TextC dark:text-TextCDark max-w-md leading-relaxed">
        {message}
      </p>
      <button
        onClick={refreshMessage}
        className="mt-6 px-5 py-2 text-sm font-medium text-TextMuted hover:text-primary dark:hover:text-primaryDark 
        transition-colors duration-200"
      >
        Inspire Me
      </button>
    </div>
  );
};

export default EmptyState;
