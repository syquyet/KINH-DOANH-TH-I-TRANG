import { useSelector } from "react-redux";
import "./personal_information.css";
import { RootState } from "../../../redux/store/configureStore";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/config/config.axios";
import { API } from "../../../api/common";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import UserService from "../../../service/user.service";
import axios from "axios";

export default function Personal() {
  const userService = new UserService();
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<any>({});
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    address: "",
  });
  // ===================================================
  const fetchdata = async () => {
    if (userLogin) {
      const response = await userService.getUserById(userLogin.id);
      setUser(response);
      setFormData({
        user_name: response.user_name,
        email: response.email,
        phone: response.phone,
        address: response.address,
      });
    }
  };
  useEffect(() => {
    fetchdata();
  }, [userLogin]);
  // ===================================================
  const handleSetForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(API + "users/" + userLogin?.id, formData);
      fetchdata();
      toast.success("Cập nhật thông tin thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.success("Lỗi khi cập nhật thông tin:" + error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  //   ================ update avatar user =================
  const [fileAvatar, setAvatar] = useState<any>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (name === "avatar" && files && files.length > 0) {
      setAvatar({ [name]: files[0] });
    }
  };
  const handleUpdateAvatar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileAvatar || !fileAvatar.avatar) {
      toast.error("Bạn phải chọn avatar mới", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const bodyformData = new FormData();
    bodyformData.append("avatar", fileAvatar.avatar);
    try {
      await userService.updateAvatar(userLogin?.id, bodyformData);
      setAvatar({});
      toast.success("Cập nhật avatar thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.success("Lỗi khi tải lên ảnh đại diện:" + error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    fetchdata();
  };

  return (
    <>
      <ToastContainer />
      <main className="information">
        <div className="information-container">
          <div className="information-avatar">
            <div>
              <img
                src={
                  user?.avatar !== null
                    ? user?.avatar
                    : "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg"
                }
                alt=""
                width="150px"
                height="150px"
              />
              <form onSubmit={handleUpdateAvatar}>
                <input
                  type="file"
                  name="avatar"
                  id="fileInput"
                  onChange={handleInputChange}
                />
                <label htmlFor="fileInput">Chọn avatar mới</label>
                <br />
                <button type="submit">Cập Nhật</button>
              </form>
              <hr />
              <a href="/user/history">Lịch sử mua hàng</a>
            </div>
          </div>
          <div className="information-form">
            <form action="">
              <h5>THÔNG TIN CÁ NHÂN</h5>
              <p>Tên:</p>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleSetForm}
              />
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleSetForm}
                readOnly
              />
              <p>Số điện thoại:</p>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleSetForm}
              />
              <p>Đại chỉ:</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleSetForm}
              />
            </form>
            <button onClick={handleUpdateUser}>Thay đổi thông tin</button>
          </div>
        </div>
      </main>
    </>
  );
}
