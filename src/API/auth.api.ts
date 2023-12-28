import axios from "axios";
import { API } from "../common/ULR.common";

// ==============login ===================
export const apilogin = async (data: any) => {
  try {
    const response = await axios.post(API + "auth/login", data);
    return response;
  } catch (err) {
    throw err;
  }
};
