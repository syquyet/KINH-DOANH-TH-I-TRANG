import "./dashboad.scss";
import SidebarAdmin from "../sidebar.admin/sidebar";
import Orders from "./order";
import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import OrdersService from "../../service/order.service";
import ProductService from "../../service/product.service";
import UserService from "../../service/user.service";
import { ParamType } from "../until/DB.Until";

export default function Dashboard() {
  const iconStyle = {
    color: "blue",
  };
  const ordersService = new OrdersService();
  const productService = new ProductService();
  const userService = new UserService();
  const [dataListOrder, setListOrder] = React.useState<any[]>([]);
  const [dataProduct, setDataProduct] = React.useState<any[]>([]);
  const [dataUser, setDataUser] = React.useState<any[]>([]);
  const [param, setParam] = React.useState<ParamType>({});
  const totalPrice = dataListOrder.reduce((sum, item) => sum + item.total, 0);
  // ==============================================================
  React.useEffect(() => {
    const fetchdata = async () => {
      const response = await ordersService.getOrders(param);
      setListOrder(response.data);
    };

    fetchdata();
  }, []);
// ==============================================================
  React.useEffect(() => {
    const fetchdata = async () => {
      const response = await productService.getProducts(param);
      setDataProduct(response.data);
    };
    fetchdata();
  }, []);

// =============================================================
  React.useEffect(() => {
    const fetchdata = async () => {
      const response = await userService.getUsers(param);
      setDataUser(response.data);
    };

    fetchdata();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <SidebarAdmin />

        <div className="dashboard-content">
          <div className="total">
            <React.Fragment>
              <h3>Tổng doanh thu</h3>
              <Typography component="p" variant="h4">
                {totalPrice?.toLocaleString()}đ
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {new Date().toDateString()}
              </Typography>
              <div>
                <Link color="primary" href="#">
                  {/* View balance */}
                </Link>
              </div>
            </React.Fragment>
          </div>
          <div className="user-content">
            <React.Fragment>
              <div>
                <i className="fa-solid fa-user-group" style={iconStyle}></i>
              </div>
              <h3>Tổng users</h3>
              <Typography component="p" variant="h4">
                {dataUser && dataUser.length}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {new Date().toDateString()}
              </Typography>
              <div>
                <Link color="primary" href="/customer.manager">
                  Xem danh sách user
                </Link>
              </div>
            </React.Fragment>
          </div>
          <div className="product-content">
            <React.Fragment>
              <div>
                <i className="fa-solid fa-shirt" style={iconStyle} />
              </div>
              <h3>Tổng sản phẩm</h3>
              <Typography component="p" variant="h4">
                {dataProduct && dataProduct.length}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {new Date().toDateString()}
              </Typography>
              <div>
                <Link color="primary" href="/product.manager">
                  Xem danh sách sản phẩm
                </Link>
              </div>
            </React.Fragment>
          </div>
          <div className="order">
            <Orders />
          </div>
        </div>
      </div>
    </>
  );
}
