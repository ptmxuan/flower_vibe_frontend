import "@/styles/Nav.scss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import themeData from "@/constants/ThemeData";
import shapeData from "@/constants/ShapeData";
import serviceData from "@/constants/ServiceData";
import SearchIcon from "@/components/search/SearchIcon";
import CartIcon from "@/components/cart/CartIcon";
import UserIcon from "@/components/user/UserIcon";
import { useNavigate, Link } from "react-router-dom"; 

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
      <div className="nav-left" onClick={() => navigate('/')}>
        <h1>FlowerVibe</h1>
      </div>
      <div className="nav-center">
        {/* Chuyển thẻ a thành Link */}
        <Link to="/">TRANG CHỦ</Link>

        {/* Chủ đề */}
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

        {/* Hình dáng */}
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

        {/* Dịch vụ */}
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

        {/* Sản phẩm */}
        <Link to="/san-pham">SẢN PHẨM</Link>  {/* Sử dụng Link thay vì a */}
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
