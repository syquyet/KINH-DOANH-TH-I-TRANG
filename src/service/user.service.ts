import { apiGetUser, apiGetUserById } from "../API/user.api";
import { ParamType } from "../admin/until/DB.Until";

class UserService {
  // ================= get user by id ====================
  async getUserById(id: any) {
    const response = await apiGetUserById(id);
    return response;
  }
  // ==================== get all users ===================
  async getUsers(params: ParamType) {
    const response = await apiGetUser(params);
    return response;
  }
 
}
export default UserService;
