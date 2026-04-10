import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const taskService = {
  getAll() {
    return api.get("/tasks").then((res) => res.data.data);
  },

  create(payload) {
    return api.post("/tasks", payload).then((res) => res.data.data);
  },

  update(id, payload) {
    return api.patch(`/tasks/${id}`, payload).then((res) => res.data.data);
  },

  remove(id) {
    return api.delete(`/tasks/${id}`).then((res) => res.data.data);
  },
};
