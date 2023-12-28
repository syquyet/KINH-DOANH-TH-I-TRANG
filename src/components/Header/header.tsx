import { useSelector } from "react-redux";
import "./header.css";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store/configureStore";
import { navigation } from "../../utils/Navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api/common";
import CartService from "../../service/cart.service";
import { Modal } from "react-bootstrap";

export default function Header() {
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [cartUser, setCartUser] = useState<any[]>([]);
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const cartService = new CartService();
  // ==============   render =====================
  useEffect(() => {
    if (userLogin) {
      const fetchdata = async () => {
        const reponse = await cartService.getCartByUserId(userLogin.id);
        setCartUser(reponse);
      };
      fetchdata();
    }
  }, [userLogin]);
  // ========== tổng sản phẩm đã mua ======================
  useEffect(() => {
    let total = 0;
    cartUser.forEach((cart) => {
      total += cart.quantity;
    });
    setQuantityProduct(total);
  }, [cartUser]);
  //  ====================đăng xuất ====================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigation("/");
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li className="logo-content">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
              <big> SƯƠNGG STORE</big>
            </li>
          </ul>
          <ul className="nav-container">
            <Link to="/">
              <li>
                <a href="">TRANG CHỦ</a>
              </li>
            </Link>
            <Link to="/user/product">
              <li>
                <a href=""> SẢN PHẨM </a>
              </li>
            </Link>

            <Link to="">
              <li>
                <a href="" style={{ color: "rgb(191, 88, 88)" }}>
                  KHUYẾN MÃI
                </a>
              </li>
            </Link>
            <Link to="">
              <li>
                <a href="">BLOG THỜI TRANG</a>
              </li>
            </Link>
          </ul>
          <ul id="nav-right">
            <li>
              {userLogin ? (
                <div>
                  {" "}
                  <a
                    href="/user/personal_information"
                    style={{ fontSize: "16px" }}
                  >
                    {userLogin.name}
                  </a>
                  <img
                    src={
                      userLogin.avatar !== null
                        ? userLogin.avatar
                        : "https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg"
                    }
                    alt=""
                  />
                </div>
              ) : (
                <Link to="/auth/register">
                  <button>Đăng ký</button>
                </Link>
              )}
            </li>

            <li>
              {userLogin ? (
                <div>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              ) : (
                <Link to="/auth/login">
                  <button>Đăng nhập</button>
                </Link>
              )}
            </li>

            <Link to="/user/cart">
              <li>
                <div className="cart-number">
                  <i className="fa-solid fa-cart-shopping" />
                  <span className="number-product">{quantityProduct}</span>
                </div>
              </li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
