import { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./customer.manager.css";
import ReactPaginate from "react-paginate";
import { API } from "../../common/ULR.common";
import UserService from "../../service/user.service";
import { ParamType } from "../until/DB.Until";
import { formatDate } from "../until/formatDate";

export default function CustomerManager() {
  const userService = new UserService();
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 5,
  });
  const fetchdata = async () => {
    const response = await userService.getUsers(param);
    setTotalCount(response.totalCount);
    setDataUser(response.data);
  };
  useEffect(() => {
    fetchdata();
  }, [searchQuery, param]);

  // =======================tìm user theo tên==========================
  const searchUserByName = async (name: string) => {
    setParam({ ...param, searchKey: "user_name", searchValue: name });
  };
  // ================= thay đổi trạng thái user ==========================
  const handleEditUser = async (user: any) => {
    const { id } = user;
    let newdata;
    if (user?.status === "activate") {
      newdata = {
        status: "inactive",
      };
    } else {
      newdata = {
        status: "activate",
      };
    }
    await axios.patch(API + `users/status/${id}`, newdata);
    fetchdata();
  };
  // =========== số sp trong một trang,Xử lý sự kiện khi chuyển trang =========
  const itemsPerPage = 5;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 5 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="customer-container">
      <SidebarAdmin />
      <div className="manage-user">
        <h5>QUẢN LÝ NGƯỜI DÙNG</h5>
        <div className="manage_users-input">
          <input
            id="manage-user-seach"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ khóa"
          />
          <button onClick={() => searchUserByName(searchQuery)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-users">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>avatar</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>address</th>
              <th>created_at</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {dataUser?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={user.avatar} alt="" width="50px" height="50px" />
                </td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{user.role == 0 ? "User" : "Admin"}</td>
                <td>
                  {user.status === "activate" ? (
                    <select name="" id="">
                      <option value="activate">{user.status}</option>
                      <option value="inactive">inactive</option>
                    </select>
                  ) : (
                    <select name="" id="">
                      <option value="inactive">{user.status}</option>
                      <option value="activate">activate</option>
                    </select>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => handleEditUser(user)}>
                    {/* <i className="fa-solid fa-pen-to-square"></i> */}
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
