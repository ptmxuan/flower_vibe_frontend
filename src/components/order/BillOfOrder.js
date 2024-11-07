import { useState } from "react";
import { Form, Button } from "antd";
function BillOfOrder({
  cartItems,
  userName,
  address,
  phoneNumber,
  formattedDate,
  selectedTime,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const totalBillPrice = cartItems.reduce((total, item) => {
    let priceAfterDiscount = item.gia;
    if (item.phantramgiamgia > 0) {
      priceAfterDiscount = item.gia - item.gia * item.phantramgiamgia;
    }
    return total + priceAfterDiscount * item.cartQuantity;
  }, 0);

  console.log("cartItems", cartItems);
  return (
    <div className="bill-of-order">
      <div className="title-bill">
        <h1>Đơn hàng của bạn</h1>
      </div>
      <div className="bill-content">
        <div className="ten-nguoi-nhan">
          <h3>Tên người nhận: </h3>
          <p>{userName}</p>
        </div>
        <div className="so-dien-thoai">
          <h3>Số điện thoại: </h3>
          <p>{phoneNumber}</p>
        </div>
        <div className="dia-chi">
          <h3>Địa chỉ nhận hàng: </h3>
          <p>{address}</p>
        </div>
        <div className="thoi-gian">
          <div className="ngay-nhan-hang">
            <h3>Ngày nhận hàng: </h3>
            <p>{formattedDate}</p>
          </div>
          <div className="thoi-gian-nhan-hang">
            <h3>Thời gian nhận: </h3>
            <p>{selectedTime}</p>
          </div>
        </div>
        {cartItems.map((item) => {
          return (
            <div key={item.id}>
              <div className="ten-sp-mua">
                <h3>Tên sản phẩm: </h3>
                <p>{item.ten}</p>
              </div>
              <div className="gia-sp">
                <h3>Giá: </h3>
                <p>
                  {item.phantramgiamgia > 0
                    ? item.gia - item.gia * item.phantramgiamgia
                    : item.gia}
                </p>
              </div>
              <div className="so-luong">
                <h3>Số lượng: </h3>
                <p>{item.cartQuantity}</p>
              </div>
              <div className="tong-gia">
                <h3>Tổng giá: </h3>
                <p>{totalBillPrice}</p>
              </div>
            </div>
          );
        })}
        <div className="thanh-toan">
          <h3>Chọn phương thức thanh toán: </h3>
          <form className="payment-method">
            <label>
              <input
                type="radio"
                name="option"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleChange}
              />
              Thanh toán khi nhận hàng
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="option"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleChange}
              />
              Thanh toán trực tuyến
            </label>
            <br />
          </form>
        </div>
        <div className="xac-nhan">
          <Form.Item>
            <Button>Mua Hàng</Button>
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default BillOfOrder;
