import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import axiosInstance from "../../../api/config/config.axios";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const [dataListOrder, setListOrder] = useState<any[]>([]);
  const userLogin = useSelector((state: RootState) => state.auth.user);
  console.log(1111, userLogin);
  

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axiosInstance.get("order-detail/" + id);
      setListOrder(reponse.data);
    };
    fetchdata();
  }, [id]);

  // ======== số sp trong một trang,Xử lý sự kiện khi chuyển trang===========
  const itemsPerPage = 5;
  const pageCount = Math.ceil(dataListOrder?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const currentListOrders = dataListOrder?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="order-container">
      <div className="manager-order">
        <h5>LỊCH SỬ MUA HÀNG</h5>
        <div className="manage_order-input">
          <input
            id="manage-order-seach"
            type="text"
            placeholder="Nhập từ khóa"
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-order">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Hình ảnh </th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá sản phẩm</th>
            </tr>
            {currentListOrders.map((order, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={order.product.product_img}
                    alt=""
                    width={70}
                    height={70}
                  />
                </td>
                <td>{order.product.product_name}</td>
                <td>{order.quantity}</td>
                <td>{(order.product.product_price*order.quantity).toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
