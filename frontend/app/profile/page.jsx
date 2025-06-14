"use client";

import { useState, useEffect } from "react";
import ProfileIcon from "@/components/ProfileIcon";
import ProfilePic from "@/public/ProfilePic.jpg";
import ProfileCard from "@/components/ProfileCard";
import ProfileModal from "@/components/ProfileModal";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import {
  updateUsername,
  updatePassword,
  updateEmail,
  fetchUserProfile,
} from "@/services/taskService";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
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

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalSubmit, setModalSubmit] = useState(() => () => {});

  const handleUsernameUpdate = async (formData) => {
    const payload = {
      username: formData.newUsername,
      current_password: formData.currentPassword,
    };

    console.log(payload);

    try {
      const data = await updateUsername(payload);
      setUser((prev) => ({ ...prev, username: data.user.username }));
      handleClose();
      toast.success("✅ Username updated");
    } catch (error) {
      toast.error("❌ Failed to update username:", error.message);
    }
  };

  const handleEmailUpdate = async (formData) => {
    try {
      const data = await updateEmail({
        new_email: formData.newEmail,
        current_password: formData.currentPassword,
      });
      setUser((prev) => ({ ...prev, email: data.user.email }));

      toast.success("✅ Email updated successfully!");
      handleClose();
    } catch (error) {
      toast.error(
        `❌ Failed to update email: ${
          error.response?.data?.detail || error.message
        }`
      );
    }
  };
  

  const handlePasswordUpdate = async (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    try {
      const data = await updatePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      });

      toast.success("✅ Password updated successfully");
      handleClose(); // Close modal
    } catch (error) {
      toast.error("❌ Failed to update password:", error.message);
    }
  };

  const handleOpen = (type) => {
    setOpen(true);
    if (type === "username") setModalSubmit(() => handleUsernameUpdate);
    else if (type === "email") setModalSubmit(() => handleEmailUpdate);
    else if (type === "password") setModalSubmit(() => handlePasswordUpdate);
    setModalType(type);
  };

  const handleClose = () => setOpen(false);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="min-h-screen bg-bground dark:bg-bgroundDark transition duration-500 ease-in-out">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-full max-w-4xl mx-auto p-8 space-y-6">
        <h1
          className="text-6xl font-bold mb-8 text-TextC dark:text-TextCDark drop-shadow-md
            shadow-FloatingShadow dark:shadow-FloatingShadowDark"
        >
          Profile
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfileIcon src={user.profilePic} className="w-[180px] h-[180px]" />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl text-TextC dark:text-TextCDark">
              {user.username}
            </h2>
          </div>
        </div>
        <ProfileModal
          isOpen={open}
          onClose={handleClose}
          onSubmit={modalSubmit}
          modalType={modalType}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfileCard
            icon={FaUser}
            text="Username"
            onClick={() => handleOpen("username")}
          />
          <ProfileCard
            icon={FaEnvelope}
            text="Email"
            onClick={() => handleOpen("email")}
          />
          <ProfileCard
            icon={FaLock}
            text="Change Password"
            onClick={() => handleOpen("password")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
