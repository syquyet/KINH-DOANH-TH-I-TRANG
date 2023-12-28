import { apiGetCategory } from "../API/category.api";
import { ParamType } from "../admin/until/DB.Until";

class CategoryService {
     // ==================== get all users ===================
  async getCategory(params: ParamType) {
    const response = await apiGetCategory(params);
    return response;
  }
}
export default CategoryService;
