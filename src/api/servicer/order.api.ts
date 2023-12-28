import { insertData } from "../../utils/DB.Utils";
import { API } from "../common";
import axiosInstance from "../config/config.axios";

// =================== insert order  ======================
export const apiInsertOrder = async (data: any) => {
  try {
    const response = await insertData("orders", data);
    return response;
  } catch (err) {
    throw err;
  }
};
// ================= get order by user =================
export const apiGetOrderByUser = async (id: any) => {
  try {
    const response = await axiosInstance.get(API + "orders/" + id);
    return response;
  } catch (err) {
    throw err;
  }
};
