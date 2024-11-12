import React from "react";
import { Button, Row, Col, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CartQuantity from "./CartQuantity";

function CartItem({
  product,
  value,
  setValue,
  initialValue,
  removeItem,
  userId,
  checked,
  onCheck,
}) {
  if (!product) {
    return null;
  }
  const productPriceSale = product.gia - product.gia * product.phantramgiamgia;
  const productTotal =
    product.phantramgiamgia > 0
      ? productPriceSale * value
      : product.gia * value;

  return (
    <div className="cart-item">
      <Row gutter={16}>
        <Col span={2}>
          <Checkbox checked={checked} onChange={onCheck} />
        </Col>
        <Col span={8}>
          <div className="cart-item-img">
            <img src={product.hinh} alt="product" />
            <span className="cart-item-info">
              <h3>{product.ten}</h3>
              <p>{`${productPriceSale.toLocaleString()} VND`}</p>
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
            <h3>{`${productTotal.toLocaleString()} VND`}</h3>
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

export default CartItem;
