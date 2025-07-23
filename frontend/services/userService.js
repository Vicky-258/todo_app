import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/handleapiError";

export const updateUsername = async ({ username, current_password }) => {
  try {
    const res = await axiosInstance.put("/api/users/profile/update/username/", {
      username,
      current_password,
    });
    return res.data;
  } catch (err) {
    handleApiError(err, "Could not update your username");
    throw err; 
  }
};

export const updatePassword = async ({ current_password, new_password }) => {
  const res = await axiosInstance.put("/api/users/profile/update/password/", {
    current_password,
    new_password,
  });
  return res.data;
};

export const updateEmail = async ({ new_email, current_password }) => {
  const res = await axiosInstance.put("/api/users/profile/update/email/", {
    new_email,
    current_password,
  });
  return res.data;
};

export const fetchUserProfile = async () => {
  const res = await axiosInstance.get("/api/users/profile/");
  return res.data;
};

export const updateProfilePicture = async (formData) => {
  try {
    const res = await axiosInstance.patch(
      "/api/users/profile/update/picture/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    handleApiError(err, "Could not update your profile picture");
    throw err;
  }
};
