import { getData, getDataById } from "../../utils/DB.Utils";
import { API } from "../common";
import axiosInstance from "../config/config.axios";

export interface ParamType {
  sortValue?: string;
  page?: number;
  pageSize?: number;
  sortKey?: string;
  searchKey?: string;
  searchValue?: string;
}
// =================Api get products ===========================
export const apiGetProduct = async (params: ParamType = {}) => {
  try {
    const response = await getData("products", params);
    return response;
  } catch (err) {}
};


//  ================ fillter products by category===============
export const apiFillterByCategory = async (data: string) => {
  try {
    const response = await axiosInstance.get(API + `products/category/${data}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
//  ================== get product by id ===================
export const apiGetProductById = async (id: string) => {
  try {
    const response = await getDataById("products", id);
    return response;
  } catch (err) {
    throw err;
  }
};

