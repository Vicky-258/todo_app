import ProfileButton from "./profileButton";
import { fetchUserProfile } from "@/services/userService";
import { Menu } from "lucide-react"
import { useState, useEffect } from "react";

export default function TopSection({ isOpen, ToggleSideBar }) {
  
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        console.error("💥 Couldn't load profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);


  return (
    <div className="fixed top-0 left-0 flex justify-between items-center w-full px-2.5 py-2 shadow-2xs shadow-NavbarShadow dark:shadow-NavbarShadowDark">
      <Menu
        onClick={ToggleSideBar}
        className="transition-all duration-300 ease-out text-TextC dark:text-TextCDark"
        id="menu-button"
      />

      <h1 className="text-primary dark:text-primaryDark font-extrabold font-pro text-xl">
        OBSYDE
      </h1>

      <ProfileButton
        key={user?.ProfilePic || "default"}
        {...(!loading ? { imageSrc: user?.profilePic } : {})}
        className="w-10 h-10 sm:w-12 sm:h-12"
      />
    </div>
  );
}
