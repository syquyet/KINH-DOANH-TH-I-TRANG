import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { API } from "../../common/ULR.common";
import ReactPaginate from "react-paginate";
import OrdersService from "../../service/order.service";
import { ParamType } from "../until/DB.Until";
import { formatDate } from "../until/formatDate";

export default function Orders() {
  const ordersService = new OrdersService();
  const [dataListOrder, setListOrder] = React.useState<any[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [param, setParam] = React.useState<ParamType>({
    page: 1,
    pageSize: 5,
  });
  const fetchdata = async () => {
    const response = await ordersService.getOrders(param);
    setTotalCount(response.totalCount);
    setListOrder(response.data);
  };
  React.useEffect(() => {
    fetchdata();
  }, [param]);
  // ============== số sp trong một trang,Xử lý sự kiện khi chuyển trang =======
  const itemsPerPage = 5;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 5 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <React.Fragment>
      <h3>Danh sách orders</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Stt</strong>
            </TableCell>
            <TableCell>
              <strong>Tên khách hàng</strong>
            </TableCell>
            <TableCell>
              <strong>Ngày order</strong>
            </TableCell>
            <TableCell>
              <strong>Số đt đặt hàng</strong>
            </TableCell>
            <TableCell>
              <strong>Địa chỉ</strong>
            </TableCell>
            <TableCell>
              <strong>Trạng thái</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Tổng order</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataListOrder.map((order, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.user_name}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.delivery_address}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">
                {order.total.toLocaleString()}đ
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/order.manager">
        Xem chi tiết order
      </Link>
      <ReactPaginate
        className="page-order"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </React.Fragment>
  );
}
