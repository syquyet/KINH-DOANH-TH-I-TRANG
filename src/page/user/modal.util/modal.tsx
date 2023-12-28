import { ProductEntity } from "../../../entities/product.entity";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import { navigation } from "../../../utils/Navigation";
import CartService from "../../../service/cart.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

interface Props {
  data: ProductEntity | undefined;
}
export default function ModalProductDetail(props: Props) {
  const cartService = new CartService();
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string[]>([]);
  const userLogin = useSelector((state: RootState) => state.auth.user);
  // ====================== setSize ================================
  useEffect(() => {
    if (props.data) {
      setSize(props.data?.size.split(","));
    }
  }, [props.data]);

  // ==================== tăng số lượng sản phẩm ======================
  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };
  // ==================== giảm số lượng ===============================
  const handleQuantityReduce = () => {
    setQuantity(quantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  };
  // =================== thêm sản phẩm vào giỏ hàng ===================
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
      product_id: props.data?.id,
      quantity: quantity,
      size: "S",
    };
    try {
      await cartService.insertCart(data);
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
      });

      // setTimeout(() => {
      //   navigation("/user/cart");
      // }, 3000);
    } catch (error) {
      toast.error("Thêm vào giỏ hàng thất bại!!!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  // ============== set lại dữ liệu sản phẩm ==========================
  const handleSetData = () => {
    setQuantity(1);
    setSize([]);
  };


  return (
    <>
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="exampleModalLabel">
                Chi tiết sản phẩm
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <section className="product_detail-container">
                <section className="banner-product product_detail-banner">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                  >
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
                          src={props.data?.product_img}
                          className="d-block"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={props.data?.product_img}
                          className="d-block"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={props.data?.product_img}
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
                  <h4>{props.data?.product_name}</h4>
                  <h5>Giá: {props.data?.product_price.toLocaleString()}đ</h5>
                  <p>Chọn size:</p>
                  <div className="btn-size">
                    {size?.map((item, index) => (
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
                    <button
                      className="btn-quantity-add"
                      onClick={handleQuantityAdd}
                    >
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
                    <button className="product_detail-btn-buynow">
                      Mua ngay
                    </button>
                    <button
                      className="product_detail-btn-delete"
                      onClick={handleSetData}
                    >
                      xóa
                    </button>
                  </div>
                  <hr />
                  <h6>MÔ TẢ SẢN PHẨM:</h6>
                  Khám phá vẻ đẹp bản thân từ phong cách thời trang của bạn.Tự
                  tin tỏa sáng với phong cách của bạn.Để không bị mờ nhạt trước
                  đám đông. Bạn phải thật khác biệt.
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
