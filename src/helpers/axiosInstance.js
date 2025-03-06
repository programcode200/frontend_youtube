// import axios from "axios";
// import {BASE_URL} from "../constants.js"

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-ten-sooty-67.vercel.app/api/v1",
  withCredentials: true, // ✅ Ensures cookies are sent with requests
});

// Attach token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

