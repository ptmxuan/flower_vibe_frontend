import React, { useEffect, useMemo, memo } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store";

function CartIcon() {
  // const { cartItems, getCart } = useCart();

  const navigate = useNavigate();
  const { cartItems } = useCombineDataContext();

  // Tính toán tổng số lượng sản phẩm

  const cartQuantities = cartItems?.items?.map((item) => item.quantity) || [];
  const totalQuantity = cartQuantities?.reduce(
    (total, quantity) => total + quantity,
    0
  );

  const handleNavigateCart = () => {
    navigate("/gio-hang");
  };

  return (
    <div className="cart-icon">
      <Badge count={totalQuantity}>
        <Button onClick={handleNavigateCart} icon={<ShoppingCartOutlined />} />
      </Badge>
    </div>
  );
}

export default memo(CartIcon);
