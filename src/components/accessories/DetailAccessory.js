import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Col, Row, Button, notification } from "antd";
import CartQuantity from "@/components/cart/CartQuantity";
import { useState, useContext } from "react";
import { CartContext } from "@/store";
import { useNavigate } from "react-router-dom";
import "@/styles/DetailAccessory.scss";

function DetailAccessory({ access }) {
  const nevigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const giaGiam = access.gia - access.gia * access.phantramgiamgia;
  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= access.quantity) {
      addToCart({ ...access, cartQuantity: quantity });
    } else {
      notification.error({
        message: "Lỗi số lượng",
        description: "Số lượng sản phẩm không hợp lệ!",
        placement: "topRight",
      });
    }
  };
  const handleCheckOut = () => {
    if (quantity > 0 && quantity <= access.quantity) {
      nevigate("/don-hang", {
        state: {
          cartItems: [...cartItems, { ...access, cartQuantity: quantity }],
        },
      });
    } else {
      notification.error({
        message: "Lỗi số lượng",
        description: "Số lượng sản phẩm không hợp lệ!",
        placement: "topRight",
      });
    }
  };
  return (
    <>
      <div className="detail-access">
        <div className="in4-access">
          <Row>
            <Col span={9}>
              <img className="access-img" src={access.hinh} />
            </Col>
            <Col span={15}>
              <h1>{access.ten}</h1>
              <div className="gia">
                {access.phantramgiamgia > 0 ? (
                  <>
                    <h2
                      style={{
                        textDecoration: "line-through",
                        fontSize: "14px",
                      }}
                    >
                      Giá: {access?.gia?.toLocaleString()} VND
                    </h2>
                    <h2> Giá giảm: {giaGiam.toLocaleString()} VND </h2>
                  </>
                ) : (
                  <>
                    <h2>Giá: {access?.gia?.toLocaleString()} VND </h2>
                  </>
                )}
              </div>
              <div className="in4">
                <p>Màu sắc: {access.mauSac}</p>
              </div>
              <div className="mo-ta-sp">
                <h3>Mô tả: </h3>
                <span>{access.description}</span>
              </div>

              <div className="so-luong-them-vao-gio-hang">
                <CartQuantity
                  access={access}
                  value={quantity}
                  setValue={setQuantity}
                  initialValue={1}
                />
                <Button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</Button>
              </div>
              <div className="mua-hang">
                <Button onClick={handleCheckOut}>MUA NGAY </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default DetailAccessory;
