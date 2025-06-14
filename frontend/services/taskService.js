import axios from "axios";
import { refreshToken } from "@/lib/auth";

export const addTask = async ({
  title,
  dueDate = null,
  priority = "low",
  description = "Not defined",
}) => {
  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-CA")
    : null;

  const body = {
    title,
    due_date: formattedDueDate,
    priority: priority.charAt(0).toUpperCase() + priority.slice(1),
    description: description.trim() === "" ? null : description,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/tasks/",
      body,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const retryResponse = await axios.post(
          "http://127.0.0.1:8000/api/tasks/",
          body,
          { withCredentials: true }
        );
        return retryResponse.data;
      }
    }
    throw error;
  }
};

export const deleteTask = async (id) => {
  const deleteRequest = async () =>
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      withCredentials: true,
    });

  try {
    await deleteRequest();
    return { success: true };
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        await deleteRequest();
        return { success: true };
      }
    }

    return { success: false, error };
  }
};

export const updateTask = async (id, newTitle, newDueDate, newPriority) => {
  const formattedDueDate = newDueDate
    ? new Date(newDueDate).toLocaleDateString("en-CA")
    : null;

  const updateRequest = async () =>
    await axios.put(
      `http://127.0.0.1:8000/api/tasks/${id}/`,
      {
        title: newTitle,
        due_date: formattedDueDate,
        priority: newPriority,
      },
      {
        withCredentials: true,
      }
    );

  try {
    const response = await updateRequest();
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const response = await updateRequest();
        return { success: true, data: response.data };
      }
    }

    return { success: false, error };
  }
};


export const updateUsername = async ({ username, current_password }) => {
  try {
    const res = await axios.put(
      "http://127.0.0.1:8000/api/users/profile/update/username/",
      { username, current_password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const retryRes = await axios.put(
          "http://127.0.0.1:8000/api/users/profile/update/username/",
          { username, current_password },
          { withCredentials: true }
        );
        return retryRes.data;
      } else {
        throw new Error("Refresh failed");
      }
    } else {
      throw err;
    }
  }
};

export const updatePassword = async ({ current_password, new_password }) => {
  try {
    const res = await axios.put(
      "http://127.0.0.1:8000/api/users/profile/update/password/",
      { current_password, new_password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const retryRes = await axios.put(
          "http://127.0.0.1:8000/api/users/profile/update/password/",
          { current_password, new_password },
          { withCredentials: true }
        );
        return retryRes.data;
      } else {
        throw new Error("Refresh failed");
      }
    } else {
      throw err;
    }
  }
};

export const updateEmail = async ({ new_email, current_password }) => {
  try {
    const res = await axios.put(
      "http://127.0.0.1:8000/api/users/profile/update/email/",
      { new_email, current_password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const retryRes = await axios.put(
          "http://127.0.0.1:8000/api/users/profile/update/email/",
          { new_email, current_password },
          { withCredentials: true }
        );
        return retryRes.data;
      } else {
        throw new Error("Refresh failed");
      }
    } else {
      throw err;
    }
  }
};

export const fetchUserProfile = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const retryRes = await axios.get(
          "http://127.0.0.1:8000/api/users/profile/",
          {
            withCredentials: true,
          }
        );
        return retryRes.data;
      } else {
        throw new Error("Token refresh failed");
      }
    } else {
      console.error("❌ Failed to fetch user profile:", err.message);
      throw err;
    }
  }
};
