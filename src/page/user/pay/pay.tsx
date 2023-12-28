import { useEffect, useState } from "react";
import "./pay.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import axios from "axios";
import { API } from "../../../api/common";
import OrderService from "../../../service/order.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { navigation } from "../../../utils/Navigation";
import PaypalComponent from "../../../components/buttonPaypal";

export default function Pay() {
  const orderService = new OrderService();
  const [total, setTotal] = useState<number>(0);
  const [cartUser, setCartUser] = useState<any[]>([]);
  const [error, setError] = useState<any>({});
  const userLogin = useSelector((state: RootState) => state.auth.user);
  // Sử dụng useState để quản lý giá trị của các ô input
  const [formData, setFormData] = useState<any>({});
  // ================= lấy và set lại cart user ==========
  useEffect(() => {
    if (userLogin) {
      const fetchdata = async () => {
        const reponse = await axios.get(API + `carts/${userLogin?.id}`);
        setCartUser(reponse.data);
      };
      setFormData({
        name: userLogin.name,
        phone: userLogin.phone,
        email: userLogin.email,
        city: "",
        district: "",
        wards: "",
        address_detail: "",
        note: "",
      });
      fetchdata();
    }
  }, [userLogin]);
  // ======================  set total ========================
  useEffect(() => {
    let total = 0;
    cartUser.forEach((cart) => {
      total += cart.quantity * cart.product.product_price;
    });
    setTotal(total);
  }, [cartUser]);
  // ============== hàm set formData ====================
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // ================= tạo order ====================
  const handleInsertOrrder = async () => {
    const newOrder = {
      user_id: userLogin?.id,
      cartUser: cartUser,
      user_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      total: 0,
      status: "pending",
      note: formData.note,
      delivery_address:
        formData.address_detail +
        "-" +
        formData.wards +
        "-" +
        formData.district +
        "-" +
        formData.city,
    };
    const error = orderService.checkErrorForm(formData);
    if (error.isError) {
      setError(error);
      return;
    }
    const response = await orderService.insertOrder(newOrder);
    if (response.status) {
      setCartUser([]);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigation("/");
      }, 3000);
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigation("/user/cart");
      }, 3000);
    }
  };

  return (
    <main>
      <ToastContainer />

      <div className="pay-container">
        <section className="pay-address">
          <h5>THÔNG TIN THANH TOÁN</h5>
          <h6>Họ và tên:</h6>
          <input
            name="name"
            id="pay-input-name"
            type="text"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleInputChange}
          />
          <p>{error?.msgName}</p>
          <h6>Số điện thoại:</h6>
          <input
            name="phone"
            id="pay-input-phone"
            type="number"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <p>{error?.msgPhone}</p>
          <h6>Email:</h6>
          <input
            name="email"
            id="pay-input-email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <p>{error?.msgEmail}</p>
          <div className="pay-address-city">
            <div>
              <h6>Tỉnh/Thành phố</h6>
              <input
                name="city"
                id="pay-input-adress1"
                type="text"
                placeholder="Tỉnh/Thành phố"
                value={formData.city}
                onChange={handleInputChange}
              />
              <p>{error?.msgCity}</p>
            </div>
            <div>
              <h6>Quận/Huyện</h6>
              <input
                name="district"
                id="pay-input-adress2"
                type="text"
                placeholder="Quận/Huyện"
                value={formData.district}
                onChange={handleInputChange}
              />
              <p>{error?.msgDistrict}</p>
            </div>
            <div>
              <h6>Phường/Xã</h6>
              <input
                name="wards"
                id="pay-input-adress3"
                type="text"
                placeholder="Phường/Xã"
                value={formData.wards}
                onChange={handleInputChange}
              />
              <p>{error?.msgWards}</p>
            </div>
          </div>
          <h6>Địa chỉ:</h6>
          <input
            name="address_detail"
            id="pay-input-adress4"
            type="text"
            placeholder="Ví dụ: Số 20, ngõ 90"
            value={formData.address_detail}
            onChange={handleInputChange}
          />
          <p>{error?.msgAddress_detail}</p>

          <h5>THÔNG TIN BỔ SUNG</h5>
          <h6>Ghi chú đơn hàng(tùy chọn)</h6>
          <textarea
            name="note"
            id="pay-input-note"
            cols={30}
            rows={2}
            placeholder="ghí chú về đơn hàng, hay địa điiểm giao hàng chi tiết hơn"
            // defaultValue={""}
            value={formData.note}
            onChange={handleInputChange}
          />
          <p>{error?.msgNote}</p>
        </section>
        <section className="pay-product">
          <h5>ĐƠN HÀNG CỦA BẠN</h5>
          <table className="pay-product-list">
            <tbody>
              <tr>
                <th>SẢN PHẨM</th>
                <th>TẠM TÍNH</th>
              </tr>
              {cartUser.map((cart) => (
                <tr>
                  <td className="pay-table-content">
                    <img
                      src={cart.product.product_img}
                      alt=""
                      width="100px"
                      height="100px"
                    />
                    <div>
                      x <span>{cart.quantity}</span>
                    </div>
                    <div>
                      <h6>{cart.product.product_name}</h6>
                      <p>sze: {cart.size}</p>
                    </div>
                  </td>
                  <td>
                    {(
                      cart.product.product_price * cart.quantity
                    ).toLocaleString()}
                    đ
                  </td>
                </tr>
              ))}

              <tr className="sum-money">
                <td>TẠM TÍNH</td>
                <td>{total.toLocaleString()}đ</td>
              </tr>
              <tr>
                <td>TỔNG</td>
                <td>{total.toLocaleString()}đ</td>
              </tr>
            </tbody>
          </table>
          <div className="pay-product-btn">
            <button type="button" onClick={handleInsertOrrder}>
              ĐẶT HÀNG
            </button>
            {/* <PaypalComponent amount={100}/> */}
          </div>
        </section>
      </div>
    </main>
  );
}
