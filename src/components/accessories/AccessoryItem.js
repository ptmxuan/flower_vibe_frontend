import { Image } from "antd";
function AccessoryItem({ access }) {
  return (
    <div className="accessory-item" key={access.id}>
      <Image className="hinh-pk" src={access.hinh} />
      <h1 className="ten-pk">{access.ten}</h1>

      <h3 className="gia-sp">{access.gia.toLocaleString()} VND</h3>

      {/* <h3 className="mau-sac">{access.mauSac}</h3> */}
      <a className="xemchitiet" href={`/phu-kien/${access.id}`}>
        Xem chi tiết
      </a>
    </div>
  );
}
export default AccessoryItem;
