import React, { useEffect, useState } from "react";
import "./product.css";
import "../product-detail/product-detail.css";
import { useNavigate } from "react-router-dom";
import BannerProduct from "./bannerProduct";
import ModalProductDetail from "../modal.util/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/configureStore";
import { getProduct } from "../../../redux/slice/productSlice";
import { ProductEntity } from "../../../entities/product.entity";
import ReactPaginate from "react-paginate";
import ProductService from "../../../service/product.service";
import axiosInstance from "../../../api/config/config.axios";
import { ParamType } from "../../../api/servicer/product.api";


const listInput = [
  {
    name: "radio",
    min: 0,
    max: 200000,
    type: "radio",
    dataFilter: "price1",
  },
  {
    name: "radio",
    min: 200000,
    max: 400000,
    type: "radio",
    dataFilter: "price2",
  },
  {
    name: "radio",
    min: 400000,
    max: 600000,
    type: "radio",
    dataFilter: "price3",
  },
  {
    name: "radio",
    min: 600000,
    max: 800000,
    type: "radio",
    dataFilter: "price4",
  },
  {
    name: "radio",
    min: 800000,
    max: 1000000,
    type: "radio",
    dataFilter: "price5",
  },
];

export default function Product() {
  // const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState<ProductEntity[]>([]);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [dataView, setDataView] = useState<ProductEntity>();
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 8,
  });
  // const product = useSelector((state: RootState) => state.products.data);
  const productService = new ProductService();
  // ============render sản phẩm lần đầu ============================
  useEffect(() => {
    const fetchdata = async () => {
      const response = await productService.getProducts(param);
      setTotalCount(response.totalCount);
      setDataProduct(response.data);
      // dispatch(getProduct(response.data));
    };
    fetchdata();
  }, [param,searchTerm]);
  // ===================== ====get data category =================
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axiosInstance.get("categories",{});
      setDataCategory(response.data.data);
    };
    fetchdata();
  }, []);
  // ===== truyền id product lên url diều hướng qua product-detail =====
  const navigate = useNavigate();
  const handleBuyNow = (id: string) => {
    navigate(`/user/product-detail/${id}`);
  };
  // =================== xem chi tiết sản phẩm =============================
  const handleView = (id: string) => {
    const dataProductView = dataProduct.find(
      (item) => item.id.toString() === id
    );
    setDataView(dataProductView);
  };
  // =================== tìm kiếm theo tên sản phẩm ========================
  const handleSearch = async () => {
    setParam({ ...param, searchKey: "product_name", searchValue: searchTerm });
  };
  // ==================== fillter theo giá sản phẩm =========================
  const handleFillter = (min: number, max: number) => {
    let dataFillter = dataProduct.filter(
      (item) => item.product_price > min && item.product_price <= max
    );
    setDataProduct(dataFillter);
    setTotalCount(dataFillter.length);
  };
  // =========== số sp trong một trang,Xử lý sự kiện khi chuyển trang ======
  const itemsPerPage = 8;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 8 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // ================= Lọc sản phẩm theo danh mục ============
  const handleFillterCategory = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParam({
      ...param,
      searchKey: "category_name",
      searchValue: event.target.value,
    });
  };
  

  return (
    <>
      <BannerProduct />
      <h1>BỘ SƯU TẬP</h1>
      <div className="seach-product">
        <input
          type="text"
          name="tim kiếm"
          id="input-seach"
          placeholder="Tìm sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <hr />
      <section className="album-seach">
        <section className="filter-product">
          <h2>
            SẢN PHẨM <span className="total-product">({totalCount})</span>
          </h2>
          <h4>Bộ lọc</h4>
          <hr />
          <div className="custom-select" style={{ width: 200 }}>
            <p>
              <b>GÍA SẢN PHẨM:</b>
            </p>
            {listInput.map((item: any) => (
              <div className="filter-group">
                <input
                  type={item.type}
                  name={item.name}
                  defaultValue={`${item.min}, ${item.max}`}
                  data-filter={item.dataFilter}
                  onChange={() => handleFillter(item.min, item.max)}
                />
                <span>{`${item.min.toLocaleString()} - ${item.max.toLocaleString()}đ`}</span>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <p>
              <b>DANH MỤC SẢN PHẨM:</b>
            </p>
            {dataCategory &&
              dataCategory.map((item) => (
                <div>
                  <input
                    type="radio"
                    name="radio"
                    defaultValue={item.category_name}
                    onChange={handleFillterCategory}
                  />
                  <span> {item.category_name}</span>
                  <br />
                </div>
              ))}
          </div>
          <hr />
        </section>
        <section className="album-product">
          {dataProduct.map((product, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src={product.product_img}
                  className="card-img-top"
                  alt="..."
                />
                <div className="btn-img">
                  <button
                    className="buy-now"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    <i className="fa-solid fa-cart-shopping" />
                    Buy now
                  </button>
                  <button
                    className="view-now"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleView(`${product.id}`)}
                  >
                    <i className="fa-regular fa-eye" />
                    View now
                  </button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
               
                <p className="card-text">
                  {product.product_price.toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
      {/* modal produc-detail */}
      <ModalProductDetail data={dataView} />
      <div className="pagination-product">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
