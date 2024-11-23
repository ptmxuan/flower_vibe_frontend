import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

function UserIcon() {
  const navigate = useNavigate();

  // Xử lý khi người dùng đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/dang-nhap");
  };

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Các items trong menu dropdown, tùy thuộc vào người dùng đã đăng nhập hay chưa
  const items = () => {
    const afterLoginItems = [
      {
        label: <Link to="/nguoi-dung">Thông tin tài khoản</Link>, // Thay <a> bằng <Link>
        key: "Thông tin tài khoản",
      },
      {
        label: "Đăng xuất",
        key: "Đăng xuất",
        onClick: handleLogout,
      },
    ];
    const beforLoginItems = [
      {
        label: <Link to="/dang-nhap">Đăng nhập</Link>, // Thay <a> bằng <Link>
        key: "Đăng nhập",
      },
    ];
    return user ? afterLoginItems : beforLoginItems;
  };

  return (
    <div className="user-icon">
      <Dropdown
        menu={{
          items: items(),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Button shape="circle" icon={<UserOutlined />} />
        </a>
      </Dropdown>
    </div>
  );
}

export default UserIcon;
