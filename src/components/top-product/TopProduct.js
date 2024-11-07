import TopProductItem from "./TopProductItem";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductItem from "@/components/product/ProductItem";
// import productData from "@/constants/ProductData"; //1
import { useContext } from "react";
import { useCombineDataContext } from "@/store";
const CustomPrevArrow = (props) => (
  <Button
    {...props}
    type="primary"
    shape="circle"
    icon={<LeftOutlined />}
    size="large"
    className="custom-arrow prev-arrow"
  />
);

const CustomNextArrow = (props) => (
  <Button
    {...props}
    type="primary"
    shape="circle"
    icon={<RightOutlined />}
    size="large"
    className="custom-arrow next-arrow"
  />
);

function TopProduct() {
  const { products } = useCombineDataContext();
  return (
    <div className="top-product">
      <h2>SẢN PHẨM NỔI BẬT</h2>
      <div className="top-product-item">
        <Carousel
          dots={false}
          arrows
          draggable={true}
          speed={700}
          infinite={true}
          slidesToShow={5}
          slidesToScroll={5}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          {products
            .filter((item) => item.luotmua > 5)
            .map((product) => (
              <div
                className="product-item-area"
                style={{ padding: "0 8px" }}
                key={product._id}
              >
                <ProductItem product={product} />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default TopProduct;
