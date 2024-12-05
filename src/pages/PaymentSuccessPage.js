import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { HeartFilled, CloseCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store";
import { useOrder } from "@/hooks";
import "@/styles/PaymentSuccessPage.scss";

function PaymentSuccessPage() {
  const { orders } = useCombineDataContext();
  const { updateOrderStatus } = useOrder();
  const [responseCode, setResponseCode] = useState(null);
  const navigate = useNavigate();

  const [lastOrder, setLastOrder] = useState();

  const handleUpdateStatus = async (id, status) => {
    console.log("Updating status for order:", id);
    await updateOrderStatus(id, status);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    setResponseCode(vnpResponseCode);

    if (orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      const id = lastOrder._id;
      setLastOrder(lastOrder);
      console.log("Order ID:", id);

      if (vnpResponseCode === "00") {
        handleUpdateStatus(id, "Đã thanh toán");
      } else {
        handleUpdateStatus(id, "Chưa thanh toán");
      }
    }
  }, [orders]);

  const renderResultContent = () => {
    if (responseCode === "00") {
      return {
        status: "success",
        icon: <HeartFilled style={{ color: "#b7bf44" }} />,
        title: "Thanh toán thành công!",
        subTitle:
          "Cảm ơn bạn đã thanh toán. FlowerVibe rất hân hạnh được phục vụ bạn!",
      };
    }
    return {
      status: "error",
      icon: <CloseCircleFilled style={{ color: "#ff4d4f" }} />,
      title: "Thanh toán thất bại",
      subTitle:
        "Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ để được giúp đỡ!",
    };
  };

  const resultContent = renderResultContent();

  return (
    <div className="payment-success-page">
      <Result
        icon={resultContent.icon}
        status={resultContent.status}
        title={resultContent.title}
        subTitle={resultContent.subTitle}
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Trở về trang chủ
          </Button>,
          <Button
            key="details"
            onClick={() =>
              navigate(`/chi-tiet-don-hang/${lastOrder?._id}`, {
                state: { order: lastOrder, showHomeButton: true },
              })
            }
          >
            Xem chi tiết
          </Button>,
        ]}
      />
    </div>
  );
}

export default PaymentSuccessPage;
