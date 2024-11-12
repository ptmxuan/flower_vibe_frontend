import { useState } from "react";
import { Form, Button } from "antd";
function BillOfOrder({
  cartItems,
  userName,
  address,
  phoneNumber,
  formattedDate,
  selectedTime,
  totalPrice,
  cartProducts,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmitOnline = async () => {
    // Gửi yêu cầu tới backend
    fetch(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/api/payment/create_payment_url`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          bankCode: "NCB",
          language: "vn",
        }),
      }
    )
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        // Kiểm tra xem phản hồi có đúng không
        if (!res.ok) {
          throw new Error("Server error: " + res.status);
        }
        return res.json(); // Xử lý dữ liệu JSON
      })
      .then((data) => {
        console.log("Response from backend:", data); // Kiểm tra dữ liệu trả về

        // Kiểm tra xem có URL thanh toán không
        if (data && data.vnpUrl) {
          window.location.href = data.vnpUrl;
        } else {
          console.log("Không nhận được URL thanh toán.");
        }
      })

      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };
  // const totalBillPrice = cartItems.reduce((total, item) => {
  //   let priceAfterDiscount = item.gia;
  //   if (item.phantramgiamgia > 0) {
  //     priceAfterDiscount = item.gia - item.gia * item.phantramgiamgia;
  //   }
  //   return total + priceAfterDiscount * item.cartQuantity;
  // }, 0);

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
        {cartProducts?.map((item) => {
          const quantityProduct =
            cartItems.find((cart) => cart.productId === item._id)?.quantity ||
            1;
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
                <p>{quantityProduct}</p>
              </div>
            </div>
          );
        })}
        <div className="tong-gia">
          <h3>Tổng giá: </h3>
          <p>{totalPrice}</p>
        </div>
        <div className="xac-nhan">
          <Form.Item>
            <Button onClick={handleSubmitOnline}>Thanh Toán</Button>
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default BillOfOrder;
