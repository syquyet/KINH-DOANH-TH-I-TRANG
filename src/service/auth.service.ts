
import { apilogin } from "../API/auth.api";

class AuthService {
  // ==================== login =====================================
  async login(datLogin: any) {
    try {
      const response = await apilogin(datLogin);
      if (response.data.role === '1') {
        localStorage.setItem("admin", JSON.stringify(response.data.id));
        return { message: "Đăng nhập thành công", status: true };
      } else {
        return { message: "Admin mới được dăng nhập", status: false };
      }
    } catch (err) {
      throw err;
    }
  }
  // =================== validate form login =================
  checkErrorLogin(datLogin: any) {
    const error = {
      isError: false,
      msgEmail: "",
      msgPassword: "",
    };
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!datLogin.email.match(validRegex)) {
      error.isError = true;
      error.msgEmail = "*Nhập đúng định dạng email";
    }
    if (!datLogin.password) {
      error.isError = true;
      error.msgPassword = "*Mật khẩu không được để trống";
    }

    return error;
  }
}
export default AuthService;
