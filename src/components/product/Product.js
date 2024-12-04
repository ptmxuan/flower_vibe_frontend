import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useCombineDataContext } from "@/store";
import { Row, Col, Tag, Button } from "antd";
import SearchComponent from "../search/SearchComponent";
import { FunnelPlotOutlined } from "@ant-design/icons";

function Product({ selectSider }) {
  const { products } = useCombineDataContext();
  const location = useLocation();
  const navigate = useNavigate();

  // State lưu trữ các filter đã chọn
  const [selectedFilters, setSelectedFilters] = useState({
    chude: [],
    mausac: [],
    gia: [],
    hinhdang: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  console.log("products", products);
  // useEffect để đọc query params và cập nhật selectedFilters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const filters = {
      chude: [],
      mausac: [],
      gia: [],
      hinhdang: [],
    };

    searchParams.forEach((value, key) => {
      const decodedValue = decodeURIComponent(value);
      const values = decodedValue.split("&&"); // Tách nếu có nhiều giá trị

      if (key === "chude") {
        filters.chude = values;
      } else if (key === "mausac") {
        filters.mausac = values;
      } else if (key === "gia") {
        filters.gia = values;
      } else if (key === "hinhdang") {
        filters.hinhdang = values;
      }
    });

    setSelectedFilters(filters);
  }, [location.search]); // Mỗi khi query params thay đổi, cập nhật selectedFilters

  // Hàm để xóa một filter khi người dùng nhấp vào tag
  const removeFilter = (type, value) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[type] = updatedFilters[type].filter(
      (item) => item !== value
    );
    setSelectedFilters(updatedFilters);

    // Cập nhật lại query string trong URL
    const queryParams = Object.entries(updatedFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([key, values]) => `${key}=${encodeURIComponent(values.join("&&"))}`)
      .join("&");

    navigate(`/san-pham?${queryParams}`);
  };

  // Hàm lọc sản phẩm dựa trên các filter và tìm kiếm
  const filterProducts = () => {
    return products.filter((product) => {
      const { chude, mausac, gia, hinhdang } = selectedFilters;

      console.log("chude", chude);
      console.log("product.chuDes", product?.chuDes);

      const matchesChude =
        chude.length === 0 ||
        chude.some((chudeItem) =>
          product?.chuDes?.some(
            (productChude) => productChude.ten === chudeItem
          )
        );

      const matchesMausac =
        mausac.length === 0 || mausac.some((item) => product.mau === item);
      const matchesGia =
        gia.length === 0 ||
        gia.some((item) => {
          const productPrice = product.gia;
          if (item === "duoi-200") return productPrice < 200000;
          if (item === "200-500")
            return productPrice >= 200000 && productPrice <= 500000;
          if (item === "500-700")
            return productPrice >= 500000 && productPrice <= 700000;
          if (item === "700-1000")
            return productPrice >= 700000 && productPrice <= 1000000;
          if (item === "tren-1000") return productPrice > 1000000;
          return false;
        });
      const matchesHinhdang =
        hinhdang.length === 0 ||
        hinhdang.some((item) => product.hinhdang === item);

      const matchesSearch =
        searchQuery.length === 0 ||
        product.ten.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesChude &&
        matchesMausac &&
        matchesGia &&
        matchesHinhdang &&
        matchesSearch
      );
    });
  };

  // Hàm xóa tất cả các filter và reset lại URL
  const deleteAll = () => {
    const resetFilters = {
      chude: [],
      mausac: [],
      gia: [],
      hinhdang: [],
    };

    setSelectedFilters(resetFilters);

    // Cập nhật lại query string trong URL để loại bỏ tất cả các filter
    navigate("/san-pham"); // Chuyển về trang không có filter
  };

  // useEffect để lọc sản phẩm khi selectedFilters hoặc searchQuery thay đổi
  useEffect(() => {
    const filtered = filterProducts();
    setFilteredProducts(filtered);
  }, [selectedFilters, products, searchQuery]); // Lọc lại khi filters, searchQuery hoặc products thay đổi

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Kiểm tra nếu có bất kỳ filter nào được chọn
  const hasFilters = Object.values(selectedFilters).some(
    (filterArray) => filterArray.length > 0
  );

  return (
    <div className="product">
      <div className="product-title">
        <h1>SẢN PHẨM</h1>
      </div>
      <div className="product-title">
        <SearchComponent onSearch={handleSearch} /> {/* Truyền hàm tìm kiếm */}
      </div>

      {/* Chỉ hiển thị phần "lọc theo" và nút "Xóa tất cả" nếu có filter được chọn */}
      {hasFilters && (
        <div className="product-tags">
          <div className="filter">
            <FunnelPlotOutlined />
            <p>Lọc theo:</p>
          </div>
          {Object.entries(selectedFilters).map(
            ([filterType, values]) =>
              values.length > 0 && (
                <div key={filterType} className="filter-tags">
                  {values.map((value) => (
                    <Tag
                      key={value}
                      color="blue"
                      closable
                      onClose={() => removeFilter(filterType, value)}
                    >
                      {value}
                    </Tag>
                  ))}
                </div>
              )
          )}
          <div className="filter-tags">
            <Button type="text" onClick={deleteAll}>
              Xóa tất cả
            </Button>
          </div>
        </div>
      )}

      <div className="product-list">
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={6} xl={6}>
                <ProductItem product={product} />
              </Col>
            ))
          ) : (
            <p className="title">
              Rất tiếc sản phẩm bạn tìm kiếm không tồn tại
            </p>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Product;
