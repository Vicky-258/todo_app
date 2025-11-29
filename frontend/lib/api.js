import axiosInstance from "@/lib/axiosInstance";

// --- Tasks API ---

export const getTasks = async () => {
    const response = await axiosInstance.get("/api/tasks/");
    return response.data;
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

    const response = await axiosInstance.post("/api/tasks/", body);
    return response.data;
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
    {
        title,
        dueDate,
        priority,
        isCompleted,
        description,
        dueTime
    }
) => {
    const formattedDueDate = dueDate
        ? new Date(dueDate).toLocaleDateString("en-CA")
        : null;

    const updatePayload = {};

    if (title !== undefined) updatePayload.title = title;
    if (dueDate !== undefined) updatePayload.due_date = formattedDueDate;

    if (priority !== undefined) {
        const cleanedPriority = priority.trim().toLowerCase();
        updatePayload.priority =
            cleanedPriority.charAt(0).toUpperCase() + cleanedPriority.slice(1);
    }

    if (isCompleted !== undefined) updatePayload.is_completed = isCompleted;

    if (description !== undefined) {
        const cleaned = description.trim();
        updatePayload.description = cleaned === "" ? null : cleaned;
    }

    if (dueTime !== undefined) updatePayload.due_time = dueTime;

    try {
        const response = await axiosInstance.put(`/api/tasks/${id}/`, updatePayload);
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

// --- User API ---

export const loginUser = async ({ email, password }) => {
    const response = await axiosInstance.post(
        "/api/users/login/",
        { email, password },
        { withCredentials: true }
    );
    if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

export const registerUser = async ({ email, username, password }) => {
    await axiosInstance.post("/api/users/register/", {
        email,
        username,
        password,
    });
    // Auto login after register (based on previous logic which did register then token)
    // But the previous code did register then /api/token/. 
    // Let's stick to the previous flow if possible or just return success.
    // The previous code in userService.js: registerAndLoginUser did both.

    // We'll keep it simple here and let the UI handle the flow or add a helper.
    return loginUser({ email, password });
};

export const logoutUser = async () => {
    // Assuming there is a logout endpoint or just clearing local state
    // The previous code didn't show a logout function in userService.js but it might be handled elsewhere.
    // If backend has /api/users/logout/ we should use it.
    // For now, we'll just clear local storage.
    if (typeof window !== 'undefined') {
        localStorage.removeItem("user");
    }
    // If there is a backend logout, we should call it.
    try {
        await axiosInstance.post("/api/users/logout/");
    } catch (e) {
        // Ignore if it fails or doesn't exist
    }
}

export const fetchUserProfile = async () => {
    const res = await axiosInstance.get("/api/users/profile/");
    return res.data;
};

export const updateUsername = async ({ username, current_password }) => {
    const res = await axiosInstance.put("/api/users/profile/update/username/", {
        username,
        current_password,
    });
    return res.data;
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

export const updateProfilePicture = async (formData) => {
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
};
