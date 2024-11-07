import { Image } from "antd";
function TopProductItem({ topProductItem }) {
  return (
    // lọc những sản phẩm có lượt mua >5
    <>
      {topProductItem
        .filter((item) => item.luotmua > 5)
        .map((item) => {
          return (
            <div className="top-product-item" key={item.id}>
              <Image className="hinh-sp" src={item.hinh} />
              <h1 className="ten-sp">{item.ten}</h1>
              <h3 className="gia-sp">{item.gia.toLocaleString()} VND</h3>
              <a className="xemchitiet" href="/xem-chi-tiet">
                Xem chi tiết
              </a>
            </div>
          );
        })}
    </>
  );
}

export default TopProductItem;
