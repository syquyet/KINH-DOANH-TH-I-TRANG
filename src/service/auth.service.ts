import { authFirebase, googleProvider } from "../api/config/fribase.config";
import { apiLogin, apiLoginGG, apiRegister } from "../api/servicer/auth.api";
import { signInWithPopup } from "firebase/auth";

class AuthService {
  // ==================== login =====================================
  async login(datLogin: any) {
    try {
      const response = await apiLogin(datLogin);
      if (response.headers) {
        if (response.data.role === "0") {
          if (response.data.status === "activate") {
            localStorage.setItem("token", response.headers["authorization"]);
            return { message: "Đăng nhập thành công", status: true };
          } else {
            return { message: "Tài khoản đã bị block!", status: false };
          }
        } else {
          return { message: "Đăng nhập thất bại", status: false };
        }
      }
    } catch (err) {
      throw err;
    }
  }
  // ====================== register ==================================
  async register(newUser: any) {
    try {
      const response = await apiRegister(newUser);
      if (response.data.status === true) {
        return {
          status: true,
          message: "Đăng ký thành công",
        };
      } else {
        return {
          status: false,
          message: "Email đã tồn tại",
        };
      }
    } catch (err) {
      throw err;
    }
  }
  // ====================== login google =================================
  loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authFirebase, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      const response = await apiLoginGG(token);

      if (response.headers) {
        localStorage.setItem("token", response.headers["authorization"]);
        return { message: "Đăng nhập thành công", status: true };
      }
    } catch (err) {
      console.error("đăng nhập google thất bại", err);
    }
  };
  // ======================h validate form register ========================
  checkErrorRegister(user: any) {
    const error = {
      isError: false,
      msgName: "",
      msgEmail: "",
      msgPhone: "",
      msgAddress: "",
      msgPassword: "",
      msgRepeatPassword: "",
    };
    if (!user.user_name) {
      error.isError = true;
      error.msgName = "*Tên người dùng không đc để trống";
    }
    if (user.user_name?.length > 45) {
      error.isError = true;
      error.msgName = "*Tên người dùng không vượt quá 45 ký tự";
    }
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email.match(validRegex)) {
      error.isError = true;
      error.msgEmail = "*Nhập đúng định dạng email";
    }
    if (!user.phone) {
      error.isError = true;
      error.msgPhone = "*Số điện thoại ko đc để trống";
    }
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(user.phone) == false) {
      error.isError = true;
      error.msgPhone = "*Định dạng số đt sai, vui lòng nhập lại";
    }
    if (!user.address) {
      error.isError = true;
      error.msgAddress = "*Địa không đc để trống";
    }
    if (user.address?.length > 200) {
      error.isError = true;
      error.msgAddress = "*Địa không không vượt quá 200 ký tự";
    }
    if (!user.password) {
      error.isError = true;
      error.msgPassword = "*Mật khẩu không đc để trống";
    }
    if (user.password?.length < 8) {
      error.isError = true;
      error.msgPassword = "*Mật khẩu 8 ký tự trở lên";
    }
    if (user.password !== user.reapeatPassword) {
      error.isError = true;
      error.msgRepeatPassword = "*Nhập mật khẩu trùng khớp";
    }

    return error;
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
      error.msgPassword = "*Nhập mật khẩu";
    }

    return error;
  }
}
export default AuthService;
