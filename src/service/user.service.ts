import { apiGetUserById, apiUpdateAvatar } from "../api/servicer/user.api";

class UserService{
// ================= get user by id ====================
async getUserById(id:any) {
    const response =await apiGetUserById(id);
    return response;
   }
//    ================ update avatar =================
async updateAvatar(id:any, data:object) {
    const response =await apiUpdateAvatar(id, data);
    return response;
}
}
export default UserService;