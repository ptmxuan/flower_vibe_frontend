import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store";
import { useOrder } from "@/hooks";
import "@/styles/PaymentSuccessPage.scss";
function PaymentSuccessPage() {
  const { orders } = useCombineDataContext();
  const { updateOrderStatus } = useOrder();
  const [responseCode, setResponseCode] = useState(null);
  const navigate = useNavigate();
  const handleUpdateStatus = async (id, status) => {
    console.log("1234", id);
    await updateOrderStatus(id, status);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    setResponseCode(vnpResponseCode);

    if (orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      const id = lastOrder._id;
      console.log("id", id);
      if (vnpResponseCode == "00") {
        const status = "Đã Thanh toán";
        handleUpdateStatus(id, status);
      }
    }
  }, [orders]);

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
