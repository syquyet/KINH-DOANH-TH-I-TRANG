import { AxiosRequestConfig } from "axios";
import axiosInstance from "./config/config.axios";
import { ParamType } from "./servicer/product.api";

const get = async (
  endpoint: string,
  params: ParamType = {},
  config: AxiosRequestConfig = {}
) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params,
      ...config,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const post = async (
  endpoint: string,

  data: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const patch = async (
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteAPI = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const apiInstance = {
  get,
  post,
  patch,
  put,
  delete: deleteAPI,
};
export default apiInstance;
