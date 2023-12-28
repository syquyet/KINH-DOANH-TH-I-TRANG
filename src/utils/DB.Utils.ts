import { API } from "../api/common";
import axiosInstance from "../api/config/config.axios";
import { ParamType } from "../api/servicer/product.api";
// =======================get all data =========================
export const getData = async (enpoint: string, params: ParamType) => {
  try {
    const response = await axiosInstance.get(API + enpoint, {
      params,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
// ======================get data by id ==========================
export const getDataById = async (enpoint: string, id: any) => {
  try {
    const response = await axiosInstance.get(API + enpoint + "/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// ====================== insert data ==============================
export const insertData = async (enpoint: string, data: object) => {
  try {
    const response = await axiosInstance.post(API + enpoint, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
// ===================== update toàn bộ data =========================
export const updateData = async (enpoint: string, id: any, data: object) => {
  try {
    const response = await axiosInstance.put(API + enpoint + "/" + id, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
// =================== delete data ===============================
export const deleteData = async (enpoint: string, id: any) => {
  try {
    const response = await axiosInstance.delete(API + enpoint + "/" + id);
    return response.data;
  } catch (err) {
    throw err;
  }
};
