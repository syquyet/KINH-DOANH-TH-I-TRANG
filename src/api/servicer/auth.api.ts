import { signInWithPopup } from "firebase/auth";
import { authFirebase, googleProvider } from "../config/fribase.config";
import axios from "axios";
import { API } from "../common";
import apiInstance from "../api";

// ===========Function to log out google =================
export const logout = async () => {
  try {
    await authFirebase.signOut();
    console.log("Đăng xuất thành công");
  } catch (err) {
    console.error("Đăng xuất thất bại", err);
  }
};
// =============== login =================
export const apiLogin = async (datLogin: any) => {
  try {
    const response = await axios.post(API + "auth/login", datLogin);
    return response;
  } catch (err) {
    throw err;
  }
};
export const apiLoginGG = async (token: string) => {
  try {
    const configs = {
      headers: {
        authorizationFB: token,
      },
    };
    const response = await apiInstance.get(
      API + "auth/login-google",
      undefined,
      configs
    );
    return response;
  } catch (err) {
    throw err;
  }
};
// ================= register =================
export const apiRegister = async (data: any) => {
  try {
    const response = await axios.post(API + "auth/register", data);
    console.log(22222, response);

    return response;
  } catch (err) {
    throw err;
  }
};
