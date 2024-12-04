import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import Admin from "@/components/admin/Admin";
import { useUserContext } from "@/store/UserContext";

function AdminPage() {
  const userInfo = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    if (userInfo.role !== "admin") {
      notification.error({
        message: "Quyền truy cập bị từ chối",
        description: "Bạn không có quyền truy cập vào trang quản trị.",
      });
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="admin-page">
      <Admin />
    </div>
  );
}

export default AdminPage;
