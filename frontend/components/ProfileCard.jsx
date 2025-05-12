const ProfileCard = ({ icon : Icon, text, onClick }) => {
  return (
    <div
      className="realtive flex flex-row justify-between items-center
             p-3 sm:p-4 md:p-5 bg-card dark:bg-cardDark
             shadow-lg rounded-2xl border border-borderC
             dark:border-borderCDark w-full max-w-sm sm:max-w-md
             md:max-w-lg lg:max-w-xl transition duration-500
             ease-in-out hover:shadow-CardShadows dark:hover:shadow-CardShadowsDark"
    >
      <div className="flex flex-row justify-between gap-x-4 items-center">
        <Icon className="text-TextC dark:text-TextCDark" />
        <span className="text-TextC dark:text-TextCDark">{text}</span>
      </div>
      <button className="text-primary dark:text-primaryDark hover:text-blue-400 transition-transform transform hover:scale-105">
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
