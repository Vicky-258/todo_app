import axios from "axios";

export const refreshToken = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.error("❌ Refresh token failed:", error);
    return false;
  }
};

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
