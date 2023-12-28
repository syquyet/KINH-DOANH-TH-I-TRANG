import "./history.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import OrderService from "../../../service/order.service";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function History() {
  const orderService = new OrderService();
  const [dataListOrder, setListOrder] = useState<any[]>([]);
  const userLogin = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await orderService.getOrderByUser(userLogin?.id);
      setListOrder(reponse.data);
    };
    fetchdata();
  }, [userLogin]);

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
  // ============== view order ========
  const navigate = useNavigate();
  const handleViewOrder = (id: number) => {
    navigate(`/user/order-detail/${id}`);
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
              <th>Ngày</th>
              <th>Tên khách hàng</th>
              <th>Số đt đặt hàng</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Tổng giá</th>
              <th>Chi tiết</th>
            </tr>
            {currentListOrders?.length > 0 ? (
              currentListOrders.map((order, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td> {formatDate(order.createdAt)} </td>
                  <td>{order.user_name}</td>
                  <td>{order.phone}</td>
                  <td>{order.delivery_address}</td>
                  <td>{order.status}</td>
                  <td>{order.total.toLocaleString()}đ</td>
                  <td>
                    <button
                      className="btn-detail"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <h3>Bạn chưa có order nào!</h3>
                </td>
              </tr>
            )}
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
