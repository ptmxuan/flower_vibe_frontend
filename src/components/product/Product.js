import productData from "@/constants/ProductData";
import { useLocation } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useCombineDataContext } from "@/store";
import { Row, Col } from "antd";

function Product({ selectSider }) {
  const { products } = useCombineDataContext();
  const location = useLocation();

  // Lấy giá trị của query parameter `hinhdang` và `chude` từ URL
  const queryParams = new URLSearchParams(location.search);
  const hinhdangFilter = queryParams.get("hinhdang");
  const chudeFilter = queryParams.get("chude");
  const mauFilter = queryParams.get("mau");

  console.log("selectSider", selectSider);
  console.log("chudeFilter", chudeFilter);

  // Lọc sản phẩm theo `hinhdang` và `chude` nếu có bộ lọc tương ứng
  const filteredProducts = products.filter((product) => {
    const matchesHinhdang = hinhdangFilter
      ? product.hinhdang === hinhdangFilter
      : true;

    const matchesChude = chudeFilter
      ? product.chude.includes(chudeFilter)
      : true;

    const matchesMau = mauFilter ? product.mau === mauFilter : true;

    // const matchesSelectSiderChude = selectSider
    //   ? product.chude.includes(selectSider)
    //   : true;

    return matchesHinhdang && matchesChude && matchesMau;
  });
  console.log("filteredProducts", filteredProducts);
  return (
    <div className="product">
      <div className="product-title">
        <h1>SẢN PHẨM</h1>
      </div>
      <div className="product-list">
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
          {filteredProducts.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Product;
