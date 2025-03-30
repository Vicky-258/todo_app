
import ProfileIcon from "./ProfileIcon";
import ProfilePic from "@/public/ProfilePic.jpg";

import {Menu} from "lucide-react"

export default function TopSection({isOpen, ToggleSideBar}) {

  return (
    <div className="fixed top-0 left-0 flex justify-between items-center w-full px-2.5 py-2 shadow-2xs shadow-NavbarShadow dark:shadow-NavbarShadowDark">
       
      <Menu
          onClick={ToggleSideBar}
        className="transform-all duration-300 ease-out text-TextC dark:text-TextCDark"
        id="menu-button"
        />
      
      <h1 className="text-primary dark:text-primaryDark font-extrabold font-pro text-xl">
        To-Do App
      </h1>

      <ProfileIcon className="invisible pointer-events-none md:visible md:pointer-events-auto" src={ProfilePic} />
    </div>
  );
}
