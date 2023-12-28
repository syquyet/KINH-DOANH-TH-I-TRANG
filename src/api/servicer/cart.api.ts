import { deleteData, insertData, updateData } from "../../utils/DB.Utils";
import { API } from "../common";
import axiosInstance from "../config/config.axios";
// =============== api get cart by user=====================
export const apiGetCartByUser = async (user_id: any) => {
  try {
    const response = await axiosInstance.get(API + `carts/${user_id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
//  =============== insert cart ===========================
export const apiInsertCart = async (data: any) => {
  try {
    const response = await insertData("carts", data);
    return response;
  } catch (err) {
    throw err
  }
};
//  ================ delete cart by id======================
export const apiDeleteCart = async (id: any) => {
  try {
    const response = await deleteData("carts", id);
    return response;
  } catch (err) {
    throw err
  }
};
//   ================ update cart ==========================
export const apiUpdateCart = async (id:any,data: any) => {
    try {
        const response = await updateData("carts",id,data);
        return response;
    } catch (err) {
        throw err
    }
}
