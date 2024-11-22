import { Image } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ProductItem({ product }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  // Calculate the discounted price if a discount is applied
  const giaGiam = product.gia - product.gia * product.phantramgiamgia;

  const handleNavigate = () => {
    // Điều hướng tới trang chi tiết sản phẩm
    navigate(`/san-pham/${product._id}`);
  };

  return (
    <div className="product-item" key={product._id}>
  <Image className="hinh-sp" src={product.hinh} />
  <h1 className="ten-sp">{product.ten}</h1>
  <div className="gia-container">
    {product.phantramgiamgia > 0 ? (
      <>
        <h3 className="gia-sp">{product.gia.toLocaleString()} VND</h3>
        <h3 className="gia-giam">{giaGiam.toLocaleString()} VND</h3>
      </>
    ) : (
      <>
        <h3 className="gia-giam">{giaGiam.toLocaleString()} VND</h3>
      </>
    )}
    <p className="xemchitiet" onClick={handleNavigate} style={{ cursor: "pointer" }}>
      Xem chi tiết
    </p>
  </div>
</div>

  );
}

export default ProductItem;
