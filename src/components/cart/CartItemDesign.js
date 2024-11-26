import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import CartQuantity from "./CartQuantity";

function CartItemDesign({
  product,
  value,
  setValue,
  initialValue,
  removeItem,
  userId,
  checked,
  onCheck,
}) {

  const nevigate = useNavigate();


  if (!product) {
    return null;
  }

  return (
    <div className="cart-item">
      <Row gutter={16}>
        <Col span={2}>
          <Checkbox checked={checked} onChange={onCheck} />
        </Col>
        <Col span={8}>
        <div 
          className="cart-item-img" 
        >
          <div className="img" style={{ backgroundImage: `url(${product.image})` }}></div>
          <span className="cart-item-info">
            <h3 onClick={() => {nevigate(`/san-pham/${product._id}`)}}>{product.name}</h3>
            <p>{`${product?.designPrice.toLocaleString()} VND`}</p>
          </span>
        </div>
        </Col>
        <Col span={4}>
          <div className="cart-item-quantity">
            <CartQuantity
              product={product}
              value={value}
              setValue={setValue}
              initialValue={initialValue}
              userId={userId}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="cart-item-price">
            <h3>{`${product?.designPrice.toLocaleString()} VND`}</h3>
          </div>
        </Col>
        <Col span={4}>
          <div className="cart-item-remove">
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={removeItem}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CartItemDesign;
