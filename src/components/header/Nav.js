import "@/styles/Nav.scss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import themeData from "@/constants/ThemeData";
import shapeData from "@/constants/ShapeData";
import flowerRetailData from "@/constants/FlowerRetailData";
import serviceData from "@/constants/ServiceData";
import SearchIcon from "@/components/search/SearchIcon";
import CartIcon from "@/components/cart/CartIcon";
import UserIcon from "@/components/user/UserIcon";
import { useNavigate } from "react-router-dom";
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
function Nav() {
  const navigate = useNavigate();

  const handleShapeClick = ({ key }) => {
    // Điều hướng đến trang sản phẩm với `label` đã chọn dưới dạng query parameter
    navigate(`/san-pham?hinhdang=${encodeURIComponent(key)}`);
  };

  const handleThemeClick = ({ key }) => {
    // Điều hướng đến trang sản phẩm với query `chude`
    navigate(`/san-pham?chude=${encodeURIComponent(key)}`);
  };
  return (
    <div className="nav">
      <div className="nav-left">
        <h1>FlowerVibe</h1>
      </div>
      <div className="nav-center">
        <a href="/">TRANG CHỦ</a>
        {/* chủ đề */}
        <p>
          <Dropdown
            menu={{
              items: themeData,
              onClick: handleThemeClick, // Gọi hàm handleThemeClick khi chọn chủ đề
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                CHỦ ĐỀ
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </p>

        {/* hình dáng */}
        <p>
          <Dropdown
            menu={{
              items: shapeData,
              onClick: handleShapeClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                HÌNH DÁNG
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </p>

        {/* DỊCH VỤ */}
        <p>
          <Dropdown
            menu={{
              items: serviceData,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                DỊCH VỤ
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </p>

        {/* SẢN PHẨM */}
        <a href="/san-pham">SẢN PHẨM</a>
      </div>
      <div className="nav-right">
        <div className="search-area">
          <SearchIcon />
        </div>
        <div className="cart-area">
          <CartIcon />
        </div>
        <div className="user-area">
          <UserIcon />
        </div>
      </div>
    </div>
  );
}

export default Nav;
