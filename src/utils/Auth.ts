import axios from "axios";
import { API } from "../api/common";
export const callFetchUserApi = async () => {
  const token = localStorage.getItem("token");
  const apiUrl = API + "auth/fetch-user";
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });


    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
