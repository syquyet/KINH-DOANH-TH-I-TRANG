import { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import axiosInstance from "../until/axiosConfig";
import { ParamType } from "../until/DB.Until";
import CategoryService from "../../service/category.service";

export default function Category() {
  const categoryService = new CategoryService();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 5,
  });
  // ===============================
  const fetchdata = async () => {
    const response = await categoryService.getCategory(param);
    setTotalCount(response.totalCount);
    setDataCategory(response.data);
  };
  useEffect(() => {
    fetchdata();
  }, [searchQuery, param]);
  // ========================thêm danh mục ================================
  const [formData, setFormData] = useState<any>({
    category_name: "",
    describe: "",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const hadleAddCategory = async () => {
    await axiosInstance.post("categories", formData);
    fetchdata();
    handleClose();
  };

  // ====================xóa danh mục========================================
  const handleDeleteCategory = (id: number) => {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = window.confirm("Bạn muốn xóa danh mục?");
    if (userConfirmed) {
      const dataDeleteProduct = dataCategory?.filter((item) => item.id !== id);
      setDataCategory(dataDeleteProduct);
      axiosInstance.delete(`categories/soft-delete/${id}`);
    } else {
      // Người dùng đã hủy, không thực hiện xóa
      console.log("Người dùng đã hủy xóa danh mục.");
    }
  };
  //  ================= tìm kiếm danh mục theo tên=============================

  const searchCategoryByName = async (name: string) => {
    setParam({ ...param, searchKey: "category_name", searchValue: name });
  };
  // ============== số sp trong một trang,Xử lý sự kiện khi chuyển trang =======
  const itemsPerPage = 5;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 5 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="product-container">
        <SidebarAdmin />

        <div className="manage-product">
          <h5>QUẢN LÝ DANH MỤC</h5>

          <div className="manage-product-input">
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchCategoryByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={handleShow}
            >
              Thêm
            </button>
          </div>
          <table className="list-product">
            <tbody>
              <tr>
                <th>Stt</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
              {dataCategory?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category_name}</td>
                  <td>{item.describe}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCategory(item.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
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
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>THÊM DANH MỤC</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Tên danh mục:</Form.Label>
                <Form.Control name="category_name" type="text" autoFocus />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control name="describe" type="text" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" type="button" onClick={hadleAddCategory}>
              THÊM
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
