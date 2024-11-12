import React, { useContext } from "react";
import { Button, InputNumber, Space } from "antd";
import { useCart } from "@/hooks/useCart"; // Import hook useCart

function CartQuantity({ product, value, setValue, userId }) {
  const { updateCartItem } = useCart(); // Lấy hàm cập nhật từ useCart

  const handleChange = (newValue) => {
    setValue(newValue);
    // updateCartItem(userId, product._id, newValue); // Cập nhật số lượng sản phẩm trong giỏ hàng
  };

  return (
    <div className="cart-quantity">
      <Space>
        <InputNumber
          min={1}
          max={product.quantity}
          value={value}
          onChange={handleChange} // Gọi handleChange khi thay đổi số lượng
        />
        {/* <Button
          type="primary"
          onClick={() => {
            setValue(1);
            updateCartItem(userId, product._id, 1); // Cập nhật về số lượng ban đầu
          }}
        >
          Đặt lại
        </Button> */}
      </Space>
    </div>
  );
}

export default CartQuantity;
