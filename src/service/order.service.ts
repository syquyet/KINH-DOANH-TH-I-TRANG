import { apiGetOrderByUser, apiInsertOrder } from "../api/servicer/order.api";

class OrderService {
  //  ================= insert cart ==========================
  async insertOrder(data: any) {
    const response = await apiInsertOrder(data);
    return response;
  }
  // =================== get order by user =========================
  async getOrderByUser(id: any) {
    const response = await apiGetOrderByUser(id);
    return response;
  }
  // ======================h validate form register ========================
  checkErrorForm(form: any) {
    const error = {
      isError: false,
      msgName: "",
      msgEmail: "",
      msgPhone: "",
      msgCity: "",
      msgDistrict: "",
      msgAddress_detail: "",
      msgNote: "",
      msgWards: "",
    };

    if (!form.name) {
      error.isError = true;
      error.msgName = "*Tên không đc để trống";
    }
    if (form.name?.length > 20) {
      error.isError = true;
      error.msgName = "*Tên người dùng không vượt quá 20 ký tự";
    }
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!form.email.match(validRegex)) {
      error.isError = true;
      error.msgEmail = "*Nhập đúng định dạng email";
    }
    if (!form.phone) {
      error.isError = true;
      error.msgPhone = "*Số điện thoại ko đc để trống";
    }
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(form.phone) == false) {
      error.isError = true;
      error.msgPhone = "*Định dạng số đt sai, vui lòng nhập lại";
    }
    if (!form.city) {
      error.isError = true;
      error.msgCity = "*Thêm địa chỉ nhận";
    }
    if (!form.district) {
      error.isError = true;
      error.msgDistrict = "*Thêm địa chỉ nhận";
    }
    if (!form.wards) {
      error.isError = true;
      error.msgWards = "*Thêm địa chỉ nhận";
    }
    if (!form.address_detail) {
      error.isError = true;
      error.msgAddress_detail = "*Thêm địa chỉ nhận";
    }
    if (!form.note) {
      error.isError = true;
      error.msgNote = "*Thêm ghi chú ";
    }

    return error;
  }
}
export default OrderService;
