import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalProductDetail from "../user/modal.util/modal";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/slice/productSlice";
import { RootState } from "../../redux/store/configureStore";
import ReactPaginate from "react-paginate";
import ProductService from "../../service/product.service";
import { ParamType } from "../../api/servicer/product.api";

export default function ListProduct() {
  // const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [dataView, setDataView] = useState<any>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param, setParam] = useState<ParamType>({
    page: 1,
    pageSize: 10,
  });
  // const product = useSelector((state: RootState) => state.products.data);
  const productService = new ProductService();
  // ================ render sản phẩm lần đầu ==================================
  useEffect(() => {
    const fetchdata = async () => {
      const response = await productService.getProducts(param);

      setTotalCount(response.totalCount);
      setDataProduct(response.data);
      // dispatch(getProduct(response));
    };

    fetchdata();
  }, [param]);
  // ================ truyền id product len url ==============================
  const navigate = useNavigate();
  const handleBuyNow = (id: number) => {
    navigate(`/user/product-detail/${id}`);
  };
  // ================= xem chi tiết sản phẩm ===================================
  const handleView = (id: string) => {
    const dataProductView = dataProduct.find(
      (item) => item.id.toString() === id
    );
    setDataView(dataProductView);
  };
  // ================= sort giá tăng dần ======================================
  const handleSortedByPrice = async (selecValue: string) => {
    setParam({ ...param, sortKey: "product_price", sortValue: selecValue });
  };
  // ============== số sp trong một trang,Xử lý sự kiện khi chuyển trang =======
  const itemsPerPage = 10;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setParam({ ...param, page: Number(selected + 1), pageSize: 10 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fillter-prodcut">
        <select
          name=""
          id=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSortedByPrice(e.target.value)
          }
        >
          <option value="mới nhất">Mới nhất</option>
          <option value="ASC">Giá từ thấp tới cao</option>
          <option value="DESC">Giá từ cao tới thấp</option>
        </select>
      </div>
      <section className="list-product">
        {dataProduct.map((product, index) => (
          <div className="card" key={index}>
            <div className="card-img">
              <img src={product.product_img} className="card-img-top" />
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
