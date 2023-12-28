import Banner from "./banner";
import BlockProduct from "./blockProduct";
import "./home.css";
import ListProduct from "./listProduct";


export default function Home(): JSX.Element {

  return (
    <>
      <Banner />
     <h1>HÀNG MỚI VỀ</h1>
      <hr />
      <ListProduct />
      <BlockProduct />
      <section className="home-trasport">
        <div>
          <img src="../../transport.png" alt="" width="150px" height="120px" />
          <h6>MIỄN PHÍ GIAO HÀNG</h6>
          <p>CHO ĐƠN TỪ 500K</p>
        </div>
        <div>
          <img src="../../dung_hang.png" alt="" width="150px" height="120px" />
          <h6>CAM KẾT GIAO ĐÚNG HÀNG</h6>
          <p>ĐƯỢC KIỂM HÀNG TRƯỚC KHI NHẬN</p>
        </div>
        <div>
          <img src="../../doitra.jpg" alt="" width="150px" height="120px" />
          <h6>HỔ TRỢ ĐỔI TRẢ</h6>
          <p>ĐỔI TRẢ HÀNG TRONG VÒNG 3 NGÀY</p>
        </div>
      </section>
    </>
  );
}
