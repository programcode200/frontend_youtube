// import axios from "axios";
// import {BASE_URL} from "../constants.js"

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;



import axios from "axios";
import { BASE_URL } from "../constants.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // ✅ Set inside create()
  withCredentials: true, // ✅ Ensures cookies are sent with requests
});

export default axiosInstance;
