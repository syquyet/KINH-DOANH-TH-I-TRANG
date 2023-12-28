import { getDataById, updateData } from "../../utils/DB.Utils";
import { API } from "../common";
import axiosInstance from "../config/config.axios";

//  ================= get product by id =================
export const apiGetUserById = async (id: any) => {
  try {
    const response = await getDataById("users", id);
    return response;
  } catch (err) {
    throw err;
  }
};
// ================= update avatar =================
export const apiUpdateAvatar = async (id: any, data: any) => {
  try {
    const response = await axiosInstance.patch(API + "users/avatar/" + id, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
