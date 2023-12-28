
import {
  apiDeleteCart,
  apiGetCartByUser,
  apiInsertCart,
  apiUpdateCart,
} from "../api/servicer/cart.api";

class CartService {
  // ================== get cart by user id ================
  async getCartByUserId(user_id: any) {
    const response = await apiGetCartByUser(user_id);
    return response;
  }
  //  ================= insert cart ==========================
  async insertCart(data: any) {
    const response = await apiInsertCart(data);
    return response;
  }
  //  ================= delete cart ===========================
  async deleteCart(id: any) {
    const response = await apiDeleteCart(id);
    return response;
  }
  //   ======= tăng số lượng sản phẩm trong cart ===============
  async quantityAdd(id: any, newCartProduct:any) {
   
    await apiUpdateCart(id, newCartProduct);
  }

}
export default CartService;
