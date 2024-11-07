import Policy from "./Policy";
import "@/styles/Footer.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="introduce">
        <h4>GIỚI THIỆU</h4>
        <div className="intro-page">
          <div className="in4-store">
            <a href="/thong-tin-cua-hang">Về chúng tôi</a>
          </div>
          <div className="policy">
            <a href="/dieu-khoan">Điều khoản chính sách</a>
          </div>
        </div>
      </div>
      <div className="dia-chi">
        <h4>SHOP HOA TƯƠI FLOWERVIBE</h4>
        <p>Địa chỉ: 132, đường 3/2, quận Ninh Kiều, thành phố Cần Thơ</p>
        <p>
          Địa chỉ: 250, đường Nguyễn An Ninh, thành phố Rạch Giá, Kiên Giang
        </p>
      </div>
      <div className="support">
        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
        <p>Zalo: (+84) 999 666 999</p>
        <p>Hotline: 0344490477</p>
      </div>
    </div>
  );
}

export default Footer;
