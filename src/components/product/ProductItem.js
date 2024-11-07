import { Image } from "antd";

function ProductItem({ product }) {
  // Calculate the discounted price if a discount is applied
  const giaGiam = product.gia - product.gia * product.phantramgiamgia;
  console.log("id", product._id);
  return (
    <div className="product-item" key={product._id}>
      <Image className="hinh-sp" src={product.hinh} />
      <h1 className="ten-sp">{product.ten}</h1>
      {product.phantramgiamgia > 0 ? (
        <>
          <h3 className="gia-sp">{product.gia.toLocaleString()} VND</h3>
          <h3 className="gia-giam">{giaGiam.toLocaleString()} VND</h3>
        </>
      ) : (
        // Display an empty space if there is no discount
        <div>
          <br></br>
          <h3 className="gia-giam">{giaGiam.toLocaleString()} VND</h3>
          <br></br>
        </div>
      )}
      <a className="xemchitiet" href={`/san-pham/${product._id}`}>
        Xem chi tiết
      </a>
    </div>
  );
}

export default ProductItem;
