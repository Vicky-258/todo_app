// services/taskService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/", // replace with your backend base URL
  withCredentials: true, // if using session auth or cookies
});

// GET all tasks
export const fetchTasks = async () => {
  const response = await API.get("/api/tasks/");
  return response.data;
};

// POST create task
export const createTask = async (taskData) => {
  console.log(taskData);
  const response = await API.post("/api/tasks/", taskData);
  return response.data;
};

// DELETE task
export const deleteTaskById = async (id) => {
  const response = await API.delete(`/api/tasks/${id}/`);
  return response.data;
};

// UPDATE task
export const updateTaskById = async (id, updatedData) => {
  const response = await API.put(`/api/tasks/${id}/`, updatedData);
  return response.data;
};
