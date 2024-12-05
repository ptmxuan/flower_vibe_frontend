import "@/styles/OrderDetailsPage.scss";
import { Button } from "antd";
function OrderDetail({ order, products }) {
  const productIdOfOrder = order?.items.map((item) => item.productId);
  const filterProductById = products?.filter((product) => {
    const fiterProduct = productIdOfOrder?.includes(product._id);
    return fiterProduct;
  });
  const orderQuantity = order?.items?.map((item) => item.quantity);

  return (
    <div className="order-detail">
      <div className="order-details-title">
        <h1>Chi tiết đơn hàng</h1>
      </div>
      <div className="order-details-content">
        <div className="order-summary">
          <p>
            <strong>Mã đơn hàng:</strong> {order?._id}
          </p>
          <p>
            <strong>Trạng thái thanh toán:</strong> {order?.status}
          </p>
        </div>
        <div className="merge">
          <div className="left">
            <div className="recipient-info">
              <h3>Thông tin người nhận</h3>
              <p>
                <strong>Tên người nhận:</strong> {order?.customer?.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong>
                {order?.customer?.phone}
              </p>
              <p>
                <strong>Địa chỉ nhận hàng:</strong>
                {order?.customer?.address}
              </p>
            </div>

            <div className="delivery-info">
              <h3>Thông tin giao hàng</h3>
              <p>
                <strong>Ngày nhận hàng:</strong> {order?.orderDate}
              </p>
              <p>
                <strong>Thời gian nhận:</strong>
                {order?.deliveryTime}
              </p>
            </div>
          </div>
          <div className="right">
            <div className="cart-items">
              <h3>Sản phẩm trong đơn hàng</h3>

              <div className="cart-item">
                <h3>Sản phẩm trong đơn hàng</h3>
                {filterProductById?.map((item) => (
                  <div key={item._id} className="cart-item-detail">
                    <p>
                      <strong>Tên sản phẩm:</strong> {item.ten}
                    </p>
                    <p>
                      <strong>Giá:</strong> {item.gia.toLocaleString()} VND
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {orderQuantity}
                    </p>
                    <p>
                      <strong>Tổng giá:</strong>{" "}
                      {(item.gia * orderQuantity).toLocaleString()} VND
                    </p>
                  </div>
                ))}
              </div>
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

export default OrderDetail;
