import { Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Icon quay lại
import "@/styles/PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="message">
        Rất tiếc, trang bạn tìm kiếm không tồn tại.
      </div>
      <Link to="/" className="go-home-link">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          size="large"
        >
          Quay về trang chủ
        </Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
