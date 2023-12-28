import "./order.manager.css";
import SidebarAdmin from "../sidebar.admin/sidebar";
import { ChangeEvent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OrdersService from "../../service/order.service";
import { ParamType } from "../until/DB.Until";
import { formatDate } from "../until/formatDate";
import { useNavigate } from "react-router-dom";

export default function OrderManager() {
  const ordersService = new OrdersService();
  const [dataListOrder, setListOrder] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 5,
  });
  const [orderChocie, setOrderChoice] = useState<{
    id: number;
    value: string | undefined;
  }>();
  const fetchdata = async () => {
    const response = await ordersService.getOrders(param);
    setTotalCount(response.totalCount);
    setListOrder(response.data);
  };
  useEffect(() => {
    fetchdata();
  }, [searchQuery, param]);

  // ============== số sp trong một trang,Xử lý sự kiện khi chuyển trang =======
  const itemsPerPage = 5;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 5 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // =======================tìm user theo tên==========================
  const searchUserByName = async (name: string) => {
    setParam({ ...param, searchKey: "user_name", searchValue: name });
  };
  // ======================= update status order =======================
  const handleInputChange = (id: number, value: string) => {
    setOrderChoice({ id, value });
  };
  const handleUpdateStatus = async (id: number) => {
    const newStatus = {
      status: orderChocie?.value,
    };

    await ordersService.updateOrders(id, newStatus);
  };
  // ============== view order ========
  const navigate = useNavigate();
  const handleViewOrder = (id: number) => {
    navigate(`/order-detail/${id}`);
  };

  return (
    <div className="order-container">
      <SidebarAdmin />
      <div className="manager-order">
        <h5>QUẢN LÝ ORDER</h5>
        <div className="manage_order-input">
          <input
            id="manage-order-seach"
            type="text"
            placeholder="Nhập từ khóa"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => searchUserByName(searchQuery)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-order">
          <tbody>
            <tr>
              <th>##</th>
              <th>Tên Khách hàng</th>
              <th>Ngày</th>
              <th>Số đt đặt hàng</th>
              <th>Tổng giá</th>
              <th>Địa chỉ</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {dataListOrder.map((order, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{order.user_name}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.phone}</td>
                <td>{order.total.toLocaleString()}đ</td>
                <td>{order.delivery_address}</td>
                <td>{order.note}</td>
                <td>
                  <select
                    name="status"
                    id="orderStatus"
                    value={
                      order.id === orderChocie?.id
                        ? orderChocie?.value
                        : order.status
                    }
                    onChange={(e) =>
                      handleInputChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shippe</option>
                    <option value="delivered">delivered</option>
                    <option value="canceled">canceled</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn-detail"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </button>
                  <button
                    // className="btn-edit"
                    className={`btn-edit ${
                      order.id !== orderChocie?.id ? "disabled" : ""
                    }`}
                    onClick={() => {
                      handleUpdateStatus(order.id);
                    }}
                    disabled={order.id !== orderChocie?.id}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
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
