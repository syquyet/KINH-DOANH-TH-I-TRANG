import { useParams } from "react-router-dom";
import "./product-detail.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../../redux/slice/productSlice";
import { navigation } from "../../../utils/Navigation";
import ProductService from "../../../service/product.service";
import CartService from "../../../service/cart.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const productService = new ProductService();
  const cartService = new CartService();
  //  ========lấy id trên url và lọc dữ liệu để lấy sản phẩm ======
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataProduct = useSelector(
    (state: RootState) => state.products.productDetail
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string[]>([]);

  const userLogin = useSelector((state: RootState) => state.auth.user);
  // ============= render khi id thay đổi =========================
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await productService.getProductById(id);
      dispatch(getProductDetail(reponse));
      setSize(reponse.size.split(","));
    };
    fetchdata();
  }, [id]);
  // ============== Tăng số lượng sản phẩm muốn mua ================
  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };
  // ============== giảm số lượng sản phẩm muốn mua ================
  const handleQuantityReduce = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  };
  //  ================ thêm sản phẩm vào giỏ hàng ====================
  const handleAddToCart = async () => {
    if (!userLogin?.email) {
      toast.error("Đăng nhập để mua hàng", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigation("/auth/login");
      }, 3000);

      return;
    }
    const data = {
      user_id: userLogin.id,
      product_id: id,
      quantity: quantity,
      size: "S",
    };
    try {
      await cartService.insertCart(data);
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigation("/");
      }, 3000);
    } catch (error) {
      toast.error("Thêm vào giỏ hàng thất bại!!!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // ============= set lại dữ liệu sản phẩm ====================
  const handleSetData = () => {
    setQuantity(1);
    // setSize("");
    toast.success("set dữ liệu", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <main className="main">
        {" "}
        <ToastContainer />
        <section className="product_detail-container">
          <section className="banner-product product_detail-banner">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={dataProduct?.product_img}
                    className="d-block"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={dataProduct?.product_img}
                    className="d-block"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={dataProduct?.product_img}
                    className="d-block"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
          <section className="product_detail-content">
            <h4>{dataProduct?.product_name}</h4>
            <h5>Giá: {dataProduct?.product_price.toLocaleString()}VND</h5>
            <p>Chọn size:</p>
            <div className="btn-size">
              {size.map((item, index) => (
                <button key={index}>{item}</button>
              ))}
            </div>
            <p>Chọn số lượng:</p>
            <div className="btn-quantity">
              <button
                className="btn-quantity-reduce"
                onClick={handleQuantityReduce}
              >
                -
              </button>
              <span>{quantity}</span>
              <button className="btn-quantity-add" onClick={handleQuantityAdd}>
                +
              </button>
            </div>
            <div>
              <button
                className="btn-add-product_detail"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button className="product_detail-btn-buynow">Mua ngay</button>
              <button
                className="product_detail-btn-delete"
                onClick={handleSetData}
              >
                xóa
              </button>
            </div>
            <hr />
            <h6>MÔ TẢ SẢN PHẨM:</h6>
            {dataProduct?.describe}
            Khám phá vẻ đẹp bản thân từ phong cách thời trang của bạn.Tự tin tỏa
            sáng với phong cách của bạn.Để không bị mờ nhạt trước đám đông. Bạn
            phải thật khác biệt.
          </section>
        </section>
      </main>
    </>
  );
}
