const ProfileCard = ({ icon: Icon, text, onClick }) => {
  return (
    <div
      className="relative flex flex-row justify-between items-center
        p-3 sm:p-4 md:p-5 bg-card dark:bg-cardDark
        shadow-lg rounded-2xl border border-borderC
        dark:border-borderCDark w-full max-w-sm sm:max-w-md
        md:max-w-lg lg:max-w-xl transition duration-300
        ease-in-out hover:shadow-CardShadows dark:hover:shadow-CardShadowsDark
        hover:-translate-y-1"
    >
      <div className="flex flex-row items-center gap-x-4 flex-grow">
        <Icon className="text-xl text-TextC dark:text-TextCDark" />
        <span className="text-base sm:text-lg text-TextC dark:text-TextCDark truncate">
          {text}
        </span>
      </div>
      <button
        onClick={onClick}
        className="text-primary dark:text-primaryDark hover:text-blue-400
        transition-transform transform hover:scale-105 pr-2 sm:pr-4"
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
