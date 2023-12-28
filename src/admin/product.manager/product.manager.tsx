import React, { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./product.manager.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import axios, { Axios } from "axios";
import { API } from "../../common/ULR.common";
import ProductService from "../../service/product.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axiosInstance from "../until/axiosConfig";
import { ParamType } from "../until/DB.Until";
import CategoryService from "../../service/category.service";

const ProductManager: React.FC = () => {
  const categoryService = new CategoryService();
  const productService = new ProductService();
  const [error, setError] = useState<any>({});
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 5,
  });
  const [formData, setFormData] = useState<any>({
    category_name: "",
    product_name: "",
    product_price: "",
    size: "",
    quantity: "",
    product_img: "",
    describe: "",
  });
  const handleClose = () => {
    setFormData({
      category_name: "",
      product_name: "",
      product_price: "",
      size: "",
      quantity: "",
      product_img: "",
      describe: "",
    });
    setShow(false);
  };

  const handleShow = (action: string) => {
    if (action === "ADD") {
      setAction("THÊM");
    }
    if (action === "EDIT") {
      setAction("EDIT");
    }
    if (action === "VIEW") {
      setAction("XEM");
    }
    setShow(true);
  };
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [idProduct, setIdProduct] = useState<number>();
  // =====================================================
  const fetchdata = async () => {
    const response = await productService.getProducts(param);
    setTotalCount(response.totalCount);
    setDataProduct(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, [param]);
  // ========= lấy danh sachs category================
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await categoryService.getCategory({});
      setDataCategory(reponse.data);
    };
    fetchdata();
  }, []);

  // ============== số sp trong một trang,Xử lý sự kiện khi chuyển trang =======
  const itemsPerPage = 5;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 5 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ======================== xóa sản phẩm ==================================
  const handleDeleteProduct = (id: number) => {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = window.confirm("Bạn muốn xóa sản phẩm?");

    if (userConfirmed) {
      const dataDeleteProduct = dataProduct.filter((item) => item.id !== id);
      setDataProduct(dataDeleteProduct);
      productService.deleteProduct(id);
    } else {
      // Người dùng đã hủy, không thực hiện xóa
      console.log("Người dùng đã hủy xóa danh mục.");
    }
  };
  //  ======================= lấy dữ liệu cho sản phẩm ======================

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "product_price" || name === "quantity") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === "product_img") {
      setFormData({ ...formData, [name]: event.target.files[0] }); //để lấy file gửi lên
    }
  };
  //  ========================= thêm sản phẩm ================================
  const hadleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const error = productService.checkErrorForm(formData); //check form data
    if (error.isError) {
      setError(error);
      return;
    }
    setError({});
    try {
      await axios.post(API + "products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!!!!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setFormData({
      category_name: "",
      product_name: "",
      product_price: "",
      size: "",
      quantity: "",
      product_img: "",
      describe: "",
    });
    fetchdata();
    handleClose();
  };

  // ======================= tìm user theo tên ==========================
  const searchUserByName = async (name: string) => {
    setParam({ ...param, searchKey: "product_name", searchValue: name });
  };
  // ========================== update product ===========================
  const handleEditProduct = (id: number) => {
    handleShow("EDIT");
    const product = dataProduct.find((product) => product.id === id);
    setIdProduct(product.id);
    setFormData({
      category_name: product.category_name,
      product_name: product.product_name,
      product_price: product.product_price,
      size: product.size,
      quantity: product.quantity,
      product_img: product.product_img,
      describe: product.describe,
    });
  };
  const updateProduct = async () => {
    const error = productService.checkErrorForm(formData); //check form data
    if (error.isError) {
      setError(error);
      return;
    }
    setError({});
    try {
      await axios.put(API + "products/" + idProduct, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Update sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Udate sản phẩm thất bại!!!!" + error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    fetchdata();
    handleClose();
  };
  // ========================== view product ============================
  const handleViewProduct = (id: number) => {
    handleShow("VIEW");
    const product = dataProduct.find((product) => product.id === id);
    setFormData({
      category_name: product.category_name,
      product_name: product.product_name,
      product_price: product.product_price,
      size: product.size,
      quantity: product.quantity,
      product_img: product.product_img,
      describe: product.describe,
    });
  };
  // ======================== Hiện thị hình ảnh sản phẩm =================
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
    setShowImageModal(false);
  };
  //   ================ import file data =================
  const [fileData, setFileData] = useState<any>();
  const handleInputChageImport = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = event.target;
    if (name === "file" && files && files.length > 0) {
      setFileData({ [name]: files[0] });
    }
  };
  const handleImportData = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileData || !fileData.file) {
      toast.error("Chọn dữ data import", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    try {
      await axiosInstance.post("products/file", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchdata();
      toast.success("Import data thành công", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.success("Lỗi import data:" + error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="product-container">
        <SidebarAdmin />
        <div className="manage-product">
          <h5>QUẢN LÝ SẢN PHẨM</h5>
          <div className="manage-product-input">
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => handleShow("ADD")}
            >
              Thêm
            </button>
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchUserByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="form-import">
            <form onSubmit={handleImportData}>
              <button type="submit">Import data</button>
              <input
                type="file"
                name="file"
                id="fileInput"
                onChange={handleInputChageImport}
              />
              {/* <label htmlFor="fileInput">Chọn avatar mới</label> */}
              {/* <br /> */}
            </form>
          </div>

          <table className="list-product">
            <tbody>
              <tr>
                <th>Stt</th>
                <th>Image</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
              {dataProduct?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.product_img}
                      alt=""
                      width="50px"
                      height="50px"
                      onClick={() => openImageModal(product.product_img)}
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product?.size.toString()}</td>
                  <td>{product?.product_price.toLocaleString()}đ</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      className="btn-detail"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
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
            <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form encType="multipart/form-data">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                  name="product_name"
                  type="text"
                  value={formData.product_name}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgName}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Giá sản phẩm:</Form.Label>
                <Form.Control
                  name="product_price"
                  type="number"
                  value={formData.product_price}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgPrice}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số lượng sản phẩm:</Form.Label>
                <Form.Control
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgQuantity}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Danh mục sản phẩm:</Form.Label>

                <Form.Select
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                >
                  {dataCategory &&
                    dataCategory.map((category, index) => (
                      <option value={category.category_name} key={index}>
                        {category.category_name}
                      </option>
                    ))}
                </Form.Select>
                <p style={{ color: "red" }}>{error.msgCategory}</p>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control
                  name="describe"
                  type="text"
                  value={formData.describe}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgDescribes}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  name="size"
                  type="text"
                  value={formData.size}
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgSize}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  id="file"
                  name="product_img"
                  type="file"
                  autoFocus
                  onChange={handleInputChange}
                />
                <p style={{ color: "red" }}>{error.msgImage}</p>
              </Form.Group>
            </Form>
            {formData.product_img && (
              <img
                src={
                  typeof formData.product_img === "string"
                    ? formData.product_img
                    : URL.createObjectURL(formData.product_img)
                }
                alt=""
                width={100}
                height={100}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            {action === "THÊM" && (
              <Button variant="primary" type="submit" onClick={hadleAddProduct}>
                {action}
              </Button>
            )}
            {action === "EDIT" && (
              <Button variant="primary" type="submit" onClick={updateProduct}>
                {action}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        {/* Modal hiển thị ảnh lớn */}
        {selectedImage && (
          <div className="image-modal-overlay" onClick={closeImageModal}>
            <div className="image-modal">
              <img src={selectedImage} alt="Large Image" />
              <button onClick={closeImageModal}>Close</button>
            </div>
          </div>
        )}

        {/* ... */}
      </div>
    </>
  );
};
export default ProductManager;
