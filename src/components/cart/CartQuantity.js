import React, { useContext } from "react";
import { Button, InputNumber, Space } from "antd";
import { CartContext } from "@/store/CartContext"; // Import CartContext

function CartQuantity({ product, value, setValue, initialValue }) {
  const { updateCartItemQuantity } = useContext(CartContext); // Lấy hàm cập nhật từ CartContext
  console.log("product", product);
  const handleChange = (newValue) => {
    setValue(newValue);
    updateCartItemQuantity(product?.id, newValue); // Cập nhật số lượng sản phẩm trong giỏ hàng
  };

  return (
    <div className="cart-quantity">
      <Space>
        <InputNumber
          min={1}
          max={product?.quantity}
          value={value}
          onChange={handleChange} // Gọi handleChange khi thay đổi số lượng
        />
        {/* <Button
          type="primary"
          onClick={() => {
            setValue(1);
            updateCartItemQuantity(product?.id, 1); // Cập nhật về số lượng ban đầu
          }}
        >
          Đặt lại
        </Button> */}
      </Space>
    </div>
  );
}

export default CartQuantity;
