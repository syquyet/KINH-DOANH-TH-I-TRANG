import { useEffect, useState } from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import { navigation } from "../../../utils/Navigation";
import CartService from "../../../service/cart.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { UserLogin } from "../../../redux/slice/authSlice";

export default function Cart() {
  const cartService = new CartService();
  const [total, setTotal] = useState<number>(0);
  const [cartUser, setCartUser] = useState<any[]>([]);
  const userLogin = useSelector((state: RootState) => state.auth.user);
  // ================ lấy dứ liệu cart của user ==============================
  const fetchdata = async (userLogin: UserLogin) => {
    const response = await cartService.getCartByUserId(userLogin.id);
    setCartUser(response);
  };
  useEffect(() => {
    if (userLogin) {
      fetchdata(userLogin);
    }
  }, [userLogin]);
  // =============== tổng tiền cart user =====================================
  useEffect(() => {
    let total = 0;
    cartUser.forEach((cart) => {
      total += cart.quantity * cart.product.product_price;
    });
    setTotal(total);
  }, [cartUser]);
  //  ================ xóa sản phẩm trong cart ============================
  const handleDeleteCart = async (id: string) => {
    const newCart = cartUser.filter((item) => item.id != id);
    setCartUser(newCart);
    await cartService.deleteCart(id);
    if (userLogin) {
      fetchdata(userLogin);
    }
  };
  // ================= tăng, giảm số lượng sản phẩm trong cart ============
  const handleChangeQuantity = async (id: string, action: string) => {
    if (!userLogin) {
      return;
    }
    if (action === "increase") {
      const cartProduct = cartUser.find((item: any) => item.id === id);
      cartProduct.quantity = cartProduct.quantity + 1;
      await cartService.quantityAdd(id, cartProduct);
    } else {
      const cartProduct = cartUser.find((item: any) => item.id === id);
      if (cartProduct.quantity <= 1) {
        return;
      }
      cartProduct.quantity = cartProduct.quantity - 1;
      await cartService.quantityAdd(id, cartProduct);
    }
    fetchdata(userLogin);
  };
  //============ điều hướng qua thanh toán ===============================
  const handlePayment = () => {
    if (cartUser) {
      if (cartUser.length == 0) {
        toast.error("giỏ hàng trống tiến hành mua hàng!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigation("/");
        }, 3000);
      } else {
        navigation("/user/payment");
      }
    }
  };
  // =================== quay lại trang home =============================
  const handleBackProduct = () => {
    navigation("/");
  };
  // ==================== lịch sử mua hàng ================================
  const handleHistory = () => {
    navigation("/user/history");
  };

  return (
    <main className="main">
      <ToastContainer />
      <div className="cart-container">
        <section className="cart-list_product">
          <table className="cart-list-product">
            <tbody>
              <tr>
                <th>SẢN PHẨM</th>
                <th>GIÁ</th>
                <th>SỐ LƯỢNG</th>
                <th>TẠM TÍNH</th>
              </tr>
              {cartUser.map((cart, index) => (
                <tr key={index}>
                  <td className="cart-table-content">
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCart(`${cart.id}`)}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                    <img
                      src={cart.product.product_img}
                      alt=""
                      width="100px"
                      height="100px"
                    />
                    <div>
                      <h6>{cart.product.product_name}</h6>
                      <p>sze: {cart.size}</p>
                    </div>
                  </td>
                  <td>{cart.product.product_price.toLocaleString()}đ</td>
                  <td>
                    <div className="btn-quantity">
                      <button
                        className="btn-quantity-reduce"
                        onClick={() => handleChangeQuantity(cart.id, "reduce")}
                      >
                        -
                      </button>
                      <span>{cart.quantity}</span>
                      <button
                        className="btn-quantity-add"
                        onClick={() =>
                          handleChangeQuantity(cart.id, "increase")
                        }
                      >
                        +
                      </button>
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
            </tbody>
          </table>
          <button className="back-product" onClick={handleBackProduct}>
            Tiếp tục xem sản phẩm
          </button>
          <button className="back-product" onClick={handleHistory}>
            Lịch sử mua hàng
          </button>
        </section>
        <section className="payment">
          <table>
            <tbody>
              <tr>
                <th>CỘNG GIỎ HÀNG</th>
              </tr>
              <tr>
                <td>Tạm tính</td>
                <td>{total.toLocaleString()}đ</td>
              </tr>
              <tr>
                <td>Tổng</td>
                <td>{total.toLocaleString()}đ</td>
              </tr>
            </tbody>
          </table>
          <button className="payment-now" onClick={handlePayment}>
            TIẾN HÀNH THANH TOÁN
          </button>
        </section>
      </div>
    </main>
  );
}
