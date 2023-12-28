import { apiGetOrders, apiUpdateOrder } from "../API/order.api";
import { ParamType } from "../admin/until/DB.Until";

class OrdersService {
  // ================= get orders =======================
  async getOrders(param: ParamType) {
    const response = await apiGetOrders(param);
    return response;
  }
  // ================= update orders =======================
  async updateOrders(id: number, status: any) {
    const response = await apiUpdateOrder(id, status);
    return;
  }
}
export default OrdersService;
