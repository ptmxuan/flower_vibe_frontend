import { Image } from "antd";
function SaleItem({ saleItem }) {
  return (
    <>
      {saleItem
        .filter((item) => item.phantramgiamgia > 0) // Lọc chỉ những sản phẩm có giảm giá
        .map((item) => {
          // Tính giá sau khi giảm
          const giaGiam = item.gia - item.gia * item.phantramgiamgia;

          return (
            <div className="sale-item" key={item.id}>
              <Image className="hinh-sp" src={item.hinh} alt={item.ten} />
              <h1 className="ten-sp">{item.ten}</h1>
              <h3 className="gia-sp">{item.gia.toLocaleString()} VND</h3>
              <h3 className="gia-giam">{giaGiam.toLocaleString()} VND</h3>
              <a className="xemchitiet" href="/xem-chi-tiet">
                Xem chi tiết
              </a>
            </div>
          );
        })}
    </>
  );
}

export default SaleItem;
