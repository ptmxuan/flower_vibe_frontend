import React, { useState, useContext, useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Row, Col } from "antd";
import { CartContext } from "@/store/CartContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const nevigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  console.log("cartItems", cartItems);
  // Initialize quantities based on cartItems length
  const [quantities, setQuantities] = useState([]);

  // Set initial quantities when cartItems change
  useEffect(() => {
    setQuantities(cartItems.map((item) => item.cartQuantity || 1)); // Cart quantity hoặc 1 nếu không có
  }, [cartItems]);

  // Update quantity for a specific item in the cart
  const updateQuantity = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // Remove item from cart
  const removeItem = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      const newQuantities = quantities.filter(
        (_, index) => prevItems[index].id !== productId
      );
      setQuantities(newQuantities);
      return newItems;
    });
  };

  // Tính tổng số lượng
  const totalItems = quantities.reduce((acc, quantity) => acc + quantity, 0);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((acc, product, index) => {
    const giaGiam = product.gia - product.gia * product.phantramgiamgia;
    const priceToUse = product.phantramgiamgia > 0 ? giaGiam : product.gia;
    return acc + priceToUse * quantities[index];
  }, 0);

  const handleCheckOut = () => {
    nevigate("/don-hang", { state: { cartItems, totalItems } });
  };
  return (
    <div className="cart">
      <Row gutter={10}>
        <Col span={16}>
          <div className="cart-area">
            <h1>Giỏ hàng</h1>
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Giỏ hàng của bạn hiện đang trống.</p>
              </div>
            ) : (
              cartItems.map((product, index) => (
                <CartItem
                  key={product.id}
                  product={product}
                  value={quantities[index]}
                  setValue={(value) => updateQuantity(index, value)}
                  initialValue={quantities[index]}
                  removeItem={() => removeItem(product.id)}
                />
              ))
            )}
          </div>
        </Col>

        <Col span={8}>
          <div className="order-summary">
            <h1>Sản phẩm được chọn</h1>
            <div className="order-summary-content">
              <p>Tổng số sản phẩm: {totalItems}</p>
              <p>Tổng tiền: {totalPrice.toLocaleString()} VND</p>
              <Button onClick={handleCheckOut} type="primary" block>
                Thanh toán
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
