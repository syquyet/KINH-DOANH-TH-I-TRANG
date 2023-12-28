

import { ParamType, deleteData, getData, getData1, getDataById } from "../admin/until/DB.Until";
// ================Api get products=======================
export const apiGetProduct = async (params: ParamType = {}) => {
  try {
    const response = await getData("products", params);
    return response;
  } catch (err) {
    throw err;
  }
};
;
//  ===================== get product by id==================
export const apiGetProductById = async (id: string) => {
  try {
    const response = await getDataById("products", id);
    return response;
  } catch (err) {
    throw err;
  }
};
// ====================== delete product ====================
export const apiDeleteProduct = async (id: string) => {
  try {
    const response = await deleteData("products/soft-delete", id);
    return response;
  } catch (err) {
    throw err;
  }
}

