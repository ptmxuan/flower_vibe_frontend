import React, { useState } from "react";
import { Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import { useUserContext } from "../store";
import { useOrder } from "@/hooks";
import "@/styles/OrderDetailsPage.scss";

function OrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOrderStatus } = useOrder();
  const { order, showHomeButton } = location.state || {};
  const { products, getAllOrdersWithoutUserId } = useCombineDataContext();
  const userInfo = useUserContext();
  const [orderData, setOrderData] = useState(order);
  const totalPrice = orderData.items?.reduce((total, item) => {
    return total + (item.price * item.quantity || 0);
  }, 0);

  const findProductById = (productId, products) => {
    return products.find((product) => product._id === productId) || null;
  };

  const handleUpdateOrderStatus = async (newStatus) => {
    const orderId = orderData?._id;

    // Chỉ cho phép hủy đơn khi trạng thái hiện tại là "Chưa thanh toán"
    if (newStatus === "Đã hủy đơn" && orderData.status === "Chưa thanh toán") {
      await updateOrderStatus(orderId, newStatus);
      await getAllOrdersWithoutUserId();
      const updatedOrder = { ...orderData, status: newStatus };
      setOrderData(updatedOrder);
      message.success(
        `Trạng thái đơn hàng đã được cập nhật thành: ${newStatus}`
      );
    } else if (newStatus !== "Đã hủy đơn") {
      // Cập nhật trạng thái khác ngoài "Đã hủy đơn"
      await updateOrderStatus(orderId, newStatus);
      await getAllOrdersWithoutUserId();
      const updatedOrder = { ...orderData, status: newStatus };
      setOrderData(updatedOrder);
      message.success(
        `Trạng thái đơn hàng đã được cập nhật thành: ${newStatus}`
      );
    } else {
      message.error(
        `Không thể hủy đơn khi trạng thái đơn hàng là "${order?.status}".`
      );
    }
  };

  return (
    <div className="order-details-page">
      <div className="order-details-title">
        <h1>Chi tiết đơn hàng</h1>
      </div>
      <div className="order-details-content">
        <div className="order-summary">
          <p>
            <strong>Mã đơn hàng:</strong> {orderData._id || "N/A"}
          </p>
          <p>
            <strong>Trạng thái thanh toán:</strong> {orderData?.status || "N/A"}
          </p>
        </div>
        <div className="merge">
          <div className="left">
            <div className="recipient-info">
              <h3>Thông tin người nhận</h3>
              <p>
                <strong>Tên người nhận:</strong>{" "}
                {orderData.customer?.name || "N/A"}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{" "}
                {orderData.customer?.phone || "N/A"}
              </p>
              <p>
                <strong>Địa chỉ nhận hàng:</strong>{" "}
                {orderData.customer?.address || "N/A"}
              </p>
            </div>
            <div className="delivery-info">
              <h3>Thông tin giao hàng</h3>
              <p>
                <strong>Ngày nhận hàng:</strong> {orderData.orderDate || "N/A"}
              </p>
              <p>
                <strong>Thời gian nhận:</strong>{" "}
                {orderData.deliveryTime || "N/A"}
              </p>
            </div>
          </div>
          <div className="right">
            <div className="cart-items">
              <h3>Sản phẩm trong đơn hàng</h3>
              {orderData.items?.map((item, index) => {
                // Tìm sản phẩm bằng productId
                const product = findProductById(item.productId, products);

                return (
                  <div className="cart-item" key={index}>
                    <p>
                      <strong>Tên sản phẩm:</strong>{" "}
                      {product ? product.ten : "Sản phẩm không tìm thấy"}
                    </p>
                    <p>
                      <strong>Giá:</strong>{" "}
                      {item.price
                        ? item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {item.quantity || "N/A"}
                    </p>
                    <p>
                      <strong>Tổng giá:</strong>
                      {item.price && item.quantity
                        ? (item.price * item.quantity).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "N/A"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-status-buttons">
          {userInfo?.role === "admin" ? (
            <>
              <Button
                type="default"
                onClick={() => handleUpdateOrderStatus("Đang chuẩn bị")}
              >
                Đã chuẩn bị
              </Button>
              <Button
                type="default"
                onClick={() => handleUpdateOrderStatus("Đang giao hàng")}
              >
                Đang giao hàng
              </Button>
            </>
          ) : null}

          {userInfo?.role === "user" ? (
            <>
              <Button
                type="default"
                onClick={() => handleUpdateOrderStatus("Đã nhận hàng")}
              >
                Đã nhận hàng
              </Button>
              <Button
                type="danger"
                onClick={() => handleUpdateOrderStatus("Đã hủy đơn")}
              >
                Đã hủy đơn
              </Button>
            </>
          ) : null}
        </div>

        <div className="back-to-home">
          {showHomeButton ? (
            userInfo?.role === "admin" ? (
              <Button type="primary" onClick={() => navigate("/admin")}>
                Về trang quản trị
              </Button>
            ) : (
              <Button type="primary" onClick={() => navigate("/")}>
                Trở về trang chủ
              </Button>
            )
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
