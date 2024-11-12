import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Col, Row, Button, notification } from "antd";
import Rating from "@/components/rate/Rating";
import CartQuantity from "@/components/cart/CartQuantity";
import { useState, useContext } from "react";
import { CartContext } from "@/store";
import { useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import { useCart } from "@/hooks";
import "@/styles/DetailProduct.scss";
function DetailProduct({ product, userId }) {
  const [value, setValue] = useState(1);
  const nevigate = useNavigate();

  const { addToCart } = useCart();
  const { getCart, cartItems } = useCombineDataContext();
  const [quantity, setQuantity] = useState(1);

  const giaGiam = product.gia - product.gia * product.phantramgiamgia;
  const handleAddToCart = async () => {
    if (quantity > 0 && quantity <= product.quantity) {
      await addToCart(userId, product._id, quantity);
      await getCart(userId);
      notification.success({
        message: "Thành công",
        description: `${quantity} sản phẩm ${product.ten} đã được thêm vào giỏ hàng!`,
        placement: "bottomRight",
      });
    } else {
      notification.error({
        message: "Lỗi số lượng",
        description: "Số lượng sản phẩm không hợp lệ!",
        placement: "bottomRight",
      });
    }
  };
  const handleCheckOut = () => {
    if (quantity > 0 && quantity <= product.quantity) {
      // Add the product to the cart
      addToCart({ ...product, cartQuantity: quantity });
      // Navigate to the order page with updated cartItems
      nevigate("/don-hang", {
        state: {
          cartItems: [...cartItems, { ...product, cartQuantity: quantity }],
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
      <Header />
      <div className="detail-product">
        <div className="in4-product">
          <Row>
            <Col span={9}>
              <img className="product-img" src={product.hinh} />
            </Col>
            <Col span={15}>
              <h1>{product.ten}</h1>
              <div className="gia">
                {product.phantramgiamgia > 0 ? (
                  <>
                    <h2
                      style={{
                        textDecoration: "line-through",
                        fontSize: "14px",
                      }}
                    >
                      Giá: {product?.gia?.toLocaleString()} VND
                    </h2>
                    <h2> Giá giảm: {giaGiam.toLocaleString()} VND </h2>
                  </>
                ) : (
                  <>
                    <h2>Giá: {product?.gia?.toLocaleString()} VND </h2>
                  </>
                )}
              </div>
              <div className="danh-gia">
                <Rating rating={product.rate} />
                <span>({product.rate})</span>
              </div>
              <div className="in4">
                <p>Hình dáng: {product.hinhdang}</p>
                <p>Màu sắc: {product.mau}</p>
                <p>Chủ đề: {product.chude}</p>
              </div>

              <div className="so-luong-them-vao-gio-hang">
                <CartQuantity
                  product={product}
                  value={quantity}
                  setValue={setQuantity}
                  initialValue={1}
                />
                <Button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</Button>
              </div>
              <div className="mua-hang">
                <Button onClick={handleCheckOut}>MUA NGAY </Button>
              </div>
              <div className="mo-ta-sp">
                <h3>Mô tả: </h3>
                <span>{product.detailDescription}</span>
              </div>
              <div className="note">
                <p>
                  Lưu ý: Một số loại hoa trong mẫu theo mùa sẽ không có hoặc
                  chất lượng không đảm bảo, do đó chúng tôi sẽ dùng các loại hoa
                  khác thay thế. Nhưng FlowerVibe đảm bảo định lượng, tone màu,
                  kiểu dáng cũng như chất lượng hoa tươi đẹp và đầy đặn nhất.
                  Bạn sẽ nhận được ảnh hoàn thiện trước khi chúng tôi giao hoa.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailProduct;
