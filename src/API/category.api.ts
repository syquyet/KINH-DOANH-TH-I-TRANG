import { ParamType, getData } from "../admin/until/DB.Until";

  // ================ get all users =================
  export const apiGetCategory = async (params: ParamType = {}) => {
    try {
      const response = await getData("categories", params);
      return response;
    } catch (err) {}
  };