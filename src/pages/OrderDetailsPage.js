import React from "react";
import { Button } from "antd";
import "@/styles/OrderDetailsPage.scss";

function OrderDetailsPage() {
  return (
    <div className="order-details-page">
      <div className="order-details-title">
        <h1>Chi tiết đơn hàng</h1>
      </div>
      <div className="order-details-content">
        <div className="order-summary">
          <p>
            <strong>Mã đơn hàng:</strong> 7676767
          </p>
          <p>
            <strong>Trạng thái thanh toán:</strong> ok
          </p>
        </div>
        <div className="merge">
          <div className="left">
            <div className="recipient-info">
              <h3>Thông tin người nhận</h3>
              <p>
                <strong>Tên người nhận:</strong> jhkjh
              </p>
              <p>
                <strong>Số điện thoại:</strong> hjbkjn
              </p>
              <p>
                <strong>Địa chỉ nhận hàng:</strong>hkbjn
              </p>
            </div>

            <div className="delivery-info">
              <h3>Thông tin giao hàng</h3>
              <p>
                <strong>Ngày nhận hàng:</strong> vgbh
              </p>
              <p>
                <strong>Thời gian nhận:</strong> cfvgbh
              </p>
            </div>
          </div>
          <div className="right">
            <div className="cart-items">
              <h3>Sản phẩm trong đơn hàng</h3>

              <div className="cart-item">
                <p>
                  <strong>Tên sản phẩm:</strong>cfg
                </p>
                <p>
                  <strong>Giá:</strong>fg
                </p>
                <p>
                  <strong>Số lượng:</strong>tuyg
                </p>
                <p>
                  <strong>Tổng giá:</strong>dfgh
                </p>
              </div>
            </div>

            <div className="order-total">
              <h3>Tổng giá đơn hàng: 500000000</h3>
            </div>
          </div>
        </div>

        <div className="back-to-home">
          <Button type="primary" onClick={() => (window.location.href = "/")}>
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
