// app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import ProfileIcon from "@/components/ProfileIcon";
import ProfilePic from "@/public/ProfilePic.jpg";
import ProfileCard from "@/components/ProfileCard";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const ProfilePage = () => {

  // State for user data (mocked for now)
  const [user, setUser] = useState({
    username: "Vicky",
    email: "vicky@example.com",
    profilePic: ProfilePic,
  });


    return (
      <div className="min-h-screen bg-bground dark:bg-bgroundDark transition duration-500 ease-in-out">
        <div className="h-full max-w-4xl mx-auto p-8 space-y-6">
          <h1
            className="text-6xl font-bold mb-8 text-TextC dark:text-TextCDark drop-shadow-md shadow-FloatingShadow
          dark:shadow-FloatingShadowDark"
          >
            Profile
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <ProfileIcon
              src={user.profilePic}
              className="w-[180px] h-[180px]"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl text-TextC dark:text-TextCDark">
                {user.username}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <ProfileCard icon={FaUser} text="Username"></ProfileCard>
            <ProfileCard icon={FaEnvelope} text="Email"></ProfileCard>
            <ProfileCard icon={FaLock} text="Change Password"></ProfileCard>
          </div>
        </div>
      </div>
    );
};

export default ProfilePage;
