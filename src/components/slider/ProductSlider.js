import React, { useContext } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import products from "@/constants/ProductData";
import ProductItem from "./ProductItem";
import { CartContext } from "@/store/CartContext";

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

function ProductSlider() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  return (
    <div className="product-carousel">
      <Carousel
        dotPosition="bottom"
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
        {products.map((product) => (
          <div
            className="product-item-area"
            style={{ padding: "0 8px" }}
            key={product.id}
          >
            <ProductItem product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductSlider;
