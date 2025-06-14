"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfileModal = ({ isOpen, onClose, onSubmit, modalType }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({});
  };
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="dark:bg-cardDark bg-card p-6 rounded-2xl shadow-2xl w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-TextC dark:text-TextCDark">
          {modalType === "email" && "Change Email"}
          {modalType === "username" && "Change Username"}
          {modalType === "password" && "Change Password"}
        </h2>

        {modalType === "email" && (
          <>
            <Input
              type="email"
              placeholder="Enter new email"
              className="mb-2 text-TextC dark:text-TextCDark"
              value={formData.newEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, newEmail: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Enter your current password"
              className="mb-4 text-TextC dark:text-TextCDark"
              value={formData.currentPassword || ""}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
            />
          </>
        )}
        {modalType === "username" && (
          <>
            <Input
              placeholder="Enter new username"
              type="name"
              className="mb-2 text-TextC dark:text-TextCDark"
              value={formData.newUsername || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newUsername: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Enter your current password"
              className="mb-4 text-TextC dark:text-TextCDark"
              type="password"
              value={formData.currentPassword || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
            />
          </>
        )}

        {modalType === "password" && (
          <>
            <Input
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="mb-2 text-TextC dark:text-TextCDark"
            />

            <Input
              type="password"
              placeholder="New Password"
              value={formData.newPassword || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="mb-2 text-TextC dark:text-TextCDark"
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="mb-4 text-TextC dark:text-TextCDark"
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className={"text-TextC dark:text-TextCDark"}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setLoading(true);
              try {
                await onSubmit(formData); // calling the passed function
              } finally {
                setLoading(false);
              }
              resetForm();
            }}
            disabled={loading}
            className="text-TextC dark:text-TextCDark flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-TextC dark:border-TextCDark rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
