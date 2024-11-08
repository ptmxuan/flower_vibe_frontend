import React from "react";
import { Result, Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@/styles/PaymentSuccessPage.scss";
function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page">
      <Result
        icon={<HeartFilled style={{ color: "#b7bf44" }} />}
        status="success"
        title="Thanh toán thành công!"
        subTitle="Cảm ơn bạn đã thanh toán. FlowerVibe rất hân hạnh được phục vụ bạn!"
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Trở về trang chủ
          </Button>,
          <Button key="buy" onClick={() => navigate("/chi-tiet-don-hang")}>
            Xem chi tiết
          </Button>,
        ]}
      />
    </div>
  );
}

export default PaymentSuccessPage;
