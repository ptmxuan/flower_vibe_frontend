import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "@/store";
function CartIcon() {
  const nevigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const handleNevigateCart = () => {
    nevigate("/gio-hang");
  };
  const totalQuantityCartItem = cartItems.reduce(
    (acc, item) => acc + (item.cartQuantity || 1),
    0
  );
  console.log("cartItems", cartItems);
  return (
    <div className="cart-icon">
      <Badge count={totalQuantityCartItem}>
        <Button
          onClick={handleNevigateCart}
          shape="circle"
          icon={<ShoppingCartOutlined />}
        />
      </Badge>
    </div>
  );
}

export default CartIcon;
