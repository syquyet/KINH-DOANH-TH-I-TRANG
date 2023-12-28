import { ParamType, getData } from "../admin/until/DB.Until";
import axiosInstance from "../admin/until/axiosConfig";

// ================Api get odders=======================
export const apiGetOrders = async (param: ParamType) => {
  try {
    const response = await getData("orders", param);
    return response;
  } catch (err) {}
};
// =============== api update order =================
export const apiUpdateOrder = async (id: number, status: any) => {
  try {
    const response = await axiosInstance.put("orders/" + id, status);
    return response;
  } catch (error) {}
};
