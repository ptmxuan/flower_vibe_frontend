import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Checkbox, notification } from "antd";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import { useCart, useDesign } from "@/hooks";
import WOW from "wowjs";
import "animate.css";
import CartItem from "./CartItem";
import CartItemDesign from "./CartItemDesign";

function Cart({ userId, products }) {
  const navigate = useNavigate();

  const { quantities, setQuantities, cartItems, getCart } =
    useCombineDataContext();

  const { designs, getDesignByUserId } = useDesign();

  const { removeFromCart, updateCartItem } = useCart();

  const [checkedList, setCheckedList] = useState([]);

  const [filteredDesigns, setFilteredDesigns] = useState([]);

  const [totalProductOrder, setTotalProductOrder] = useState(0);

  // Lẩy mảng ids của cart
  const productIds = cartItems?.items?.map((item) => item.productId);

  // Lọc thông tin chi tiết sản phẩm từ giỏ hàng
  const cartProducts = products?.filter((product) =>
    productIds?.includes(product._id)
  );

  //Check tất cả
  const checkAll = checkedList?.length === cartItems?.items?.length;
  //Check 1 phần
  const indeterminate =
    checkedList.length > 0 && checkedList.length < cartItems?.items?.length;

  // Tổng số lượng
  const productQuantity = cartItems?.items?.reduce((acc, item) => {
    acc[item.productId] = item.quantity;
    return acc;
  }, {});

  // Tính tổng giá sản phẩm trong cart
  const totalPriceDefault = cartProducts?.reduce(
    (acc, product) => {
      if (checkedList.includes(product._id)) {
        const price = product.gia ?? 0;
        const discount =
          product.phantramgiamgia > 0 ? product.phantramgiamgia : 0;

        const quantity = quantities[product._id] ?? 1;

        acc.totalPrice +=
          discount > 0
            ? (price - price * discount) * quantity
            : price * quantity;

        acc.totalQuantity += quantity;

        return acc;
      }
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );

  // Tính tổng giá thiết kế
  const totalPriceDesign = filteredDesigns?.reduce(
    (acc, product) => {
      if (checkedList.includes(product._id)) {
        const quantity = quantities[product._id] ?? 1;

        acc.totalPrice += product.designPrice * quantity;
        acc.totalQuantity += quantity;

        return acc;
      }
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 } // Khởi tạo accumulator
  );

  const totalPrice = totalPriceDefault.totalPrice + totalPriceDesign.totalPrice;

  const totalProductOrderCalculate =
    totalPriceDefault.totalQuantity + totalPriceDesign.totalQuantity;

  // Cập nhật state (nếu cần)
  useEffect(() => {
    setTotalProductOrder(totalProductOrderCalculate);
  }, [totalProductOrderCalculate]);

  // Thư viện hiệu ứng
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  // Lấy danh sách thiết kế
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await getDesignByUserId(userId);
        getCart(userId);
      }
    };
    fetchData();
  }, [userId]);

  // Cập nhật số lượng
  useEffect(() => {
    if (cartItems && cartItems?.items?.length > 0) {
      setQuantities(productQuantity || {});
    } else {
      setQuantities({});
    }
  }, [cartItems]);

  // Lọc sản phẩm thiết kế
  useEffect(() => {
    if (cartItems && cartItems.items && cartItems?.items?.length > 0) {
      const itemDesignIds = cartItems.items
        .filter((item) => item.itemType === "design")
        .map((item) => item.productId);

      const filtered = designs.filter((design) =>
        itemDesignIds.includes(design._id)
      );

      setFilteredDesigns(filtered);
    }
  }, [cartItems, designs]);

  const onCheckAllChange = (e) => {
    setCheckedList(
      e.target.checked
        ? [
            ...cartProducts.map((product) => product._id),
            ...filteredDesigns.map((product) => product._id),
          ]
        : []
    );
  };

  const updateQuantity = async (productId, value) => {
    const newQuantities = { ...quantities };

    if (newQuantities[productId] !== value) {
      newQuantities[productId] = value !== undefined ? value : 1;
      setQuantities(newQuantities);

      await updateCartItem(userId, productId, newQuantities[productId]);

      await getCart(userId);
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(userId, productId);

    await getCart(userId);

    notification.success({
      message: "Xoá thành công",
      description: "Đã xoá thành công sản phẩm",
      placement: "bottomRight",
    });
  };

  const handleCheckout = async () => {
    const cartItemDefaults = cartItems.items.filter((item) =>
      checkedList.includes(item.productId)
    );
    const cartItemDesign = filteredDesigns.filter((item) =>
      checkedList.includes(item._id)
    );
    navigate("/don-hang", {
      state: {
        cartItemDefaults: cartItemDefaults,
        cartItemDesign: cartItemDesign,
        totalPrice,
      },
    });
  };

  return (
    <div className="cart">
      <Row gutter={10}>
        <Col span={16}>
          <div className="cart-area">
            <h1>Giỏ hàng</h1>
            {cartItems?.items?.length > 0 ? (
              <div className="checked">
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  Chọn tất cả
                </Checkbox>
              </div>
            ) : (
              <h4>Giỏ hàng của bạn đang trống</h4>
            )}
            {filteredDesigns?.map((product) => (
              <CartItemDesign
                key={product._id}
                product={product}
                designs={designs}
                value={quantities[product._id] ?? 1}
                setValue={(value) => updateQuantity(product._id, value)}
                initialValue={quantities[product._id] ?? 1}
                removeItem={() => handleRemoveItem(product._id)}
                userId={userId}
                checked={checkedList.includes(product._id)}
                onCheck={() => {
                  setCheckedList((prev) => {
                    if (prev.includes(product._id)) {
                      return prev.filter((id) => id !== product._id);
                    } else {
                      return [...prev, product._id];
                    }
                  });
                }}
              />
            ))}
            {cartProducts?.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                designs={designs}
                value={quantities[product._id] ?? 1}
                setValue={(value) => updateQuantity(product._id, value)}
                initialValue={quantities[product._id] ?? 1}
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
              <p>Tổng số sản phẩm: {totalProductOrder}</p>
              <p>Tổng tiền: {totalPrice?.toLocaleString()} VND</p>
              <div className="order-summary-buttons">
                <Button
                  type="primary"
                  disabled={checkedList.length === 0}
                  block
                  onClick={handleCheckout}
                >
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
