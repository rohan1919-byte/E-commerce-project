import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-project-backend-8p1d.onrender.com/api",
});

export default api;
