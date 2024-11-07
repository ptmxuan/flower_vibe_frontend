import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

function UserIcon() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/dang-nhap");
  };
  const items = [
    {
      label: <a href="/dang-nhap">Đăng nhập</a>,
      key: "Đăng nhập",
    },
    {
      label: <a href="/nguoi-dung">Thông tin tài khoản</a>,
      key: "Thông tin tài khoản",
    },
    {
      label: "Đăng xuất",
      key: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  return (
    <div className="user-icon">
      <Dropdown
        menu={{
          items,
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
