import React from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "@/styles/OrderDetailsPage.scss";

function OrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { order, showHomeButton } = location.state || {};

  const totalPrice = order.items?.reduce((total, item) => {
    return total + (item.price * item.quantity || 0);
  }, 0);

  return (
    <div className="order-details-page">
      <div className="order-details-title">
        <h1>Chi tiết đơn hàng</h1>
      </div>
      <div className="order-details-content">
        <div className="order-summary">
          <p>
            <strong>Mã đơn hàng:</strong> {order._id || "N/A"}
          </p>
          <p>
            <strong>Trạng thái thanh toán:</strong> {order.status || "N/A"}
          </p>
        </div>
        <div className="merge">
          <div className="left">
            <div className="recipient-info">
              <h3>Thông tin người nhận</h3>
              <p>
                <strong>Tên người nhận:</strong> {order.customer?.name || "N/A"}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.customer?.phone || "N/A"}
              </p>
              <p>
                <strong>Địa chỉ nhận hàng:</strong>{" "}
                {order.customer?.address || "N/A"}
              </p>
            </div>
            <div className="delivery-info">
              <h3>Thông tin giao hàng</h3>
              <p>
                <strong>Ngày nhận hàng:</strong> {order.orderDate || "N/A"}
              </p>
              <p>
                <strong>Thời gian nhận:</strong> {order.deliveryTime || "N/A"}
              </p>
            </div>
          </div>
          <div className="right">
            <div className="cart-items">
              <h3>Sản phẩm trong đơn hàng</h3>
              {order.items?.map((item, index) => (
                <div className="cart-item" key={index}>
                  <p>
                    <strong>Tên sản phẩm:</strong> {item.productId || "N/A"}
                  </p>
                  <p>
                    <strong>Giá:</strong> {item.price || "N/A"}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.quantity || "N/A"}
                  </p>
                  <p>
                    <strong>Tổng giá:</strong>{" "}
                    {item.price * item.quantity || "N/A"}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-total">
              <h3>Tổng giá trị đơn hàng: {totalPrice + " VNĐ" || "N/A"}</h3>
            </div>
          </div>
        </div>
        <div className="back-to-home">
          {showHomeButton ? (
            <Button type="primary" onClick={() => navigate("/")}>
              Trở về trang chủ
            </Button>
          ) : (
            <Button type="primary" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
