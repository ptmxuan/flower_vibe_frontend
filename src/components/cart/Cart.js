import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Row, Col, Checkbox, notification } from "antd";
import { useCart } from "@/hooks/useCart"; // Import useCart hook
import WOW from "wowjs";
import "animate.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useCombineDataContext } from "@/store/CombinedDataContext";

function Cart({ userId, products }) {
  const { removeFromCart, updateCartItem } = useCart();
  const navigate = useNavigate();
  const { quantities, setQuantities, cartItems, getCart } =
    useCombineDataContext();

  const productIds = cartItems?.items?.map((item) => item.productId);
  const productQuantity = cartItems?.items?.map((item) => item.quantity); // Số lượng sản phẩm trong giỏ hàng
  const cartProducts = products?.filter((product) =>
    productIds?.includes(product._id)
  );

  const [checkedList, setCheckedList] = useState([]);
  const checkAll = checkedList.length === cartProducts?.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < cartProducts.length;

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  useEffect(() => {
    if (cartItems && cartItems?.items?.length > 0) {
      setQuantities(productQuantity || []);
    } else {
      setQuantities([]);
    }
  }, [cartItems]);
  const totalPrice = cartProducts?.reduce((acc, product, index) => {
    if (checkedList.includes(product._id)) {
      const price = product.gia ?? 0;
      const discount =
        product.phantramgiamgia > 0 ? product.phantramgiamgia : 0;
      const quantity = quantities[index] ?? 1;

      // Calculate total price with or without discount
      const itemTotal =
        discount > 0 ? (price - price * discount) * quantity : price * quantity;

      return acc + itemTotal;
    }
    return acc;
  }, 0);

  const handleCheckout = async () => {
    const selectedItems = cartItems.items.filter((item) =>
      checkedList.includes(item.productId)
    );

    // // Gọi API thanh toán và xóa sản phẩm đã chọn
    // try {
    //   // // Giả sử có một hàm gọi API thanh toán
    //   // await createOrder({ userId, items: selectedItems, totalPrice });
    //   // await Promise.all(
    //   //   selectedItems.map((item) => removeFromCart(userId, item.productId))
    //   // );

    //   notification.success({
    //     message: "Thanh toán thành công",
    //     description: "Đơn hàng của bạn đã được tạo.",
    //     placement: "bottomRight",
    //   });

    //   // Cập nhật giỏ hàng
    //   getCart(userId);
    navigate("/don-hang", { state: { cartItems: selectedItems, totalPrice } });
    // } catch (error) {
    //   notification.error({
    //     message: "Lỗi thanh toán",
    //     description: "Đã xảy ra lỗi trong quá trình thanh toán.",
    //     placement: "bottomRight",
    //   });
    // }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(userId, productId);
    getCart(userId);
    notification.success({
      message: "Xoá thành công",
      description: "Đã xoá thành công sản phẩm",
      placement: "bottomRight",
    });
  };

  const updateQuantity = async (index, value) => {
    const newQuantities = [...quantities];

    if (newQuantities[index] !== value) {
      newQuantities[index] = value !== undefined ? value : 1;
      setQuantities(newQuantities);

      const productId = productIds[index];
      await updateCartItem(userId, productId, newQuantities[index]);
      await getCart(userId);
    }
  };

  const onCheckAllChange = (e) => {
    setCheckedList(
      e.target.checked ? cartProducts.map((product) => product._id) : []
    );
  };

  return (
    <div className="cart">
      <Row gutter={10}>
        <Col span={16}>
          <div className="cart-area">
            <h1>Giỏ hàng</h1>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Chọn tất cả
            </Checkbox>
            {cartProducts?.map((product, index) => (
              <CartItem
                key={product._id}
                product={product}
                value={quantities[index] ?? 1}
                setValue={(value) => updateQuantity(index, value)}
                initialValue={quantities[index] ?? 1}
                removeItem={() => handleRemoveItem(product._id)}
                userId={userId}
                checked={checkedList.includes(product._id)}
                onCheck={() => {
                  setCheckedList((prev) =>
                    prev.includes(product._id)
                      ? prev.filter((id) => id !== product._id)
                      : [...prev, product._id]
                  );
                }}
              />
            ))}
          </div>
        </Col>

        <Col span={8}>
          <div className="order-summary">
            <h1>Tóm tắt đơn hàng</h1>
            <div className="order-summary-content">
              <p>
                Tổng số sản phẩm:{" "}
                {quantities.reduce((acc, quantity) => acc + quantity, 0)}
              </p>
              <p>Tổng tiền: {totalPrice?.toLocaleString()} VND</p>
              <div className="order-summary-buttons">
                <Button type="primary" block onClick={handleCheckout}>
                  Thanh toán
                </Button>
                <Button
                  type="primary"
                  block
                  onClick={() => navigate("/san-pham")}
                >
                  Tiếp tục mua hàng
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
