import axios from "axios";
import { API } from "../common";

const axiosInstance = axios.create({
  baseURL: API,
  // timeout: 5000,
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = token;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
