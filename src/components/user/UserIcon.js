import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

function UserIcon() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/dang-nhap");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const items = () => {
    const afterLoginItems = [
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
    const beforLoginItems = [
      {
        label: <a href="/dang-nhap">Đăng nhập</a>,
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
