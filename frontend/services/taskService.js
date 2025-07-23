import axiosInstance from "@/lib/axiosInstance"; // Your custom axios with interceptor

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
    const response = await axiosInstance.post("/api/tasks/", body);
    return response.data;
  } catch (error) {
    throw error; 
  }
  
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/api/tasks/${id}/`);
    return { success: true };
  } catch (error) {
    return { success: false, error }; 
  }
};


export const updateTask = async (
  id,
  newTitle,
  newDueDate,
  newPriority,
  isCompleted,
  newDescription,
  newDueTime
) => {
  const formattedDueDate = newDueDate
    ? new Date(newDueDate).toLocaleDateString("en-CA")
    : null;

  const updatePayload = {};

  if (newTitle !== undefined) {
    updatePayload.title = newTitle;
  }

 
  if (newDueDate !== undefined) {
    updatePayload.due_date = formattedDueDate;
  }

  if (newPriority !== undefined) {
    const cleanedPriority = newPriority.trim().toLowerCase();
    updatePayload.priority =
      cleanedPriority.charAt(0).toUpperCase() + cleanedPriority.slice(1);
  }

  if (isCompleted !== undefined) {
    updatePayload.is_completed = isCompleted;
  }

  if (newDescription !== undefined) {
    const cleaned = newDescription.trim();
    updatePayload.description = cleaned === "" ? null : cleaned;
  }

  if (newDueTime !== undefined) {
    updatePayload.due_time = newDueTime;
  }

  try {
    const response = await axiosInstance.put(
      `/api/tasks/${id}/`,
      updatePayload
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};


export const updateTaskStatus = async (id, isCompleted) => {
  try {
    const response = await axiosInstance.patch(`/api/tasks/${id}/`, {
      is_completed: isCompleted,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

