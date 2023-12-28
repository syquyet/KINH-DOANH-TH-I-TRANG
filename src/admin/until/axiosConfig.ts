import axios from "axios";
import { API } from "../../common/ULR.common";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API,
  timeout: 3000,
  headers: {
    Authorization: `${token}`,
  },
});

export default axiosInstance;
