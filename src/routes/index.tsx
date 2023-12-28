import Category from "../admin/category/category";
import CustomerManager from "../admin/customer.manager/customer.manager";
import Dashboard from "../admin/dashboard/dashboad";
import Login from "../admin/login/login";
import NotFound from "../admin/notFound/notFound";
import OrderManager from "../admin/order.manager/order.manager";
import OrderDetail from "../admin/order_detatil/order_detail";
import ProductManager from "../admin/product.manager/product.manager";
import { I_Routes } from "../type/type";

export const routes: I_Routes[] = [
  {
    titles: "Dashboard",
    path: "/",
    element: <Dashboard />,
  },
  {
    titles: "ProductManager",
    path: "/product.manager",
    element: <ProductManager />,
  },
  {
    titles: "OrderManager",
    path: "/order.manager",
    element: <OrderManager />,
  },
  {
    titles: "CustomerManager",
    path: "/customer.manager",
    element: <CustomerManager />,
  },
  {
    titles: "Category",
    path: "/category",
    element: <Category />,
  },
  {
    titles: "Order_detail",
    path: "/order-detail/:id",
    element: <OrderDetail />,
  },
  {
    titles: "notFound",
    path: "*",
    element: <NotFound/>
  },
];
