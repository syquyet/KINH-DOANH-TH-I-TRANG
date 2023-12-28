import {
  ParamType,
  apiFillterByCategory,
  apiGetProduct,
  apiGetProductById,
} from "../api/servicer/product.api";

class ProductService {
  // ================= get products =======================
  async getProducts(params: ParamType) {
    const response = await apiGetProduct(params);
    return response;
  }

  //===================fillter by category ===============
  async fillByCategory(data: string) {
    const response = await apiFillterByCategory(data);
    return response;
  }
  // ===================== get product by id ================
  async getProductById(id: any) {
    const response = await apiGetProductById(id);
    return response;
  }
}
export default ProductService;
