import { ParamType, getData, getDataById } from "../admin/until/DB.Until";
import axiosInstance from "../admin/until/axiosConfig";


//  =============== get user by id ===================
export const apiGetUserById = async (id: string) => {
    try {
      const response = await getDataById("users", id);
      return response;
    } catch (err) {
      throw err;
    }
  };
  // ================ get all users =================
  export const apiGetUser = async (params: ParamType = {}) => {
    try {
      const response = await getData("users", params);
      return response;
    } catch (err) {}
  };

