import { useState } from "react";
import { Form, Button, notification } from "antd";
import { useOrder, useCart } from "@/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "@/store/UserContext";
import { useCombineDataContext } from "@/store/CombinedDataContext";

import { Divider } from "antd";

function BillOfOrder({
  isValid,
  cartItems,
  userName,
  address,
  phoneNumber,
  formattedDate,
  selectedTime,
  totalPrice,
  cartProducts,
  cartDesigns,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const { createOrder } = useOrder();
  const { getCart } = useCombineDataContext();
  const userInfo = useUserContext();
  const { removeFromCart } = useCart();
  const userId = userInfo?._id;
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // Hàm handleSubmit để gửi yêu cầu tạo đơn hàng
  const handleSubmit = async () => {
    const customer = {
      name: userName,
      phone: phoneNumber,
      address: address,
    };
    const pricePromises = cartItems.map(async (item) => {
      try {
        if (cartProducts.some((product) => product._id === item.productId)) {
          const response = await axios.get(
            `http://localhost:2512/api/products/${item.productId}`
          );
          // Sao chép đối tượng và loại bỏ trường `_id`
          const { gia, itemType, productId, quantity } = {
            ...item,
            gia: response.data.gia,
            itemType: "product",
          };
          return { gia, itemType, productId, quantity };
        }
        if (cartDesigns.some((product) => product._id === item.productId)) {
          // Tìm thiết kế trong mảng cartDesigns theo productId
          const design = cartDesigns.find(
            (design) => design._id === item.productId
          );

          if (!design) {
            throw new Error(`Không tìm thấy thiết kế với ID ${item.productId}`);
          }

          const { gia, itemType, productId, quantity } = {
            ...item,
            gia: design.designPrice, // Lấy giá từ trường designPrice
            itemType: "design",
          };
          return { gia, itemType, productId, quantity };
        }
      } catch (error) {
        notification.error({
          message: `Lỗi khi lấy giá cho sản phẩm ${item.productId}`,
          description: error.message,
        });
      }
    });

    // const totalPrice = cartItemsWithPrices.reduce((total, item) => {
    //   return total + (item.gia || 0) * item.quantity;
    // }, 0);
    try {
      const cartItemsWithPrices = await Promise.all(pricePromises);
      console.log("cartItemsWithPrices", cartItemsWithPrices);
      let response = await createOrder({
        userId: userId,
        items: cartItemsWithPrices,
        customer: customer,
        orderDate: formattedDate,
        deliveryTime: selectedTime,
      });

      notification.success({
        message: "Đơn hàng thành công",
        description: "Đơn hàng đã được tạo thành công!",
        placement: "bottomRight",
      });

      // Gọi API tạo transaction
      const cartId = cartItems.map((item) => item.productId);

      await removeFromCart(userId, cartId);
      await getCart(userId);
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi tạo đơn hàng",
        description: error.message,
      });
    }
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
      .then(() => {
        handleSubmit();
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
            <>
              <div key={item.id} className="san-pham">
                <div className="ten-sp-mua">
                  <h3>Tên sản phẩm: </h3>
                  <p>{item.ten}</p>
                </div>
                <div className="gia-sp">
                  <h3>Đơn giá: </h3>
                  <p>
                    {item.phantramgiamgia > 0
                      ? item.gia - item.gia * item.phantramgiamgia
                      : item.gia}{" "}
                    VNĐ
                  </p>
                </div>
                <div className="so-luong">
                  <h3>Số lượng: </h3>
                  <p>{quantityProduct}</p>
                </div>
              </div>
              <Divider style={{ margin: "2px 0" }} />
            </>
          );
        })}
        {cartDesigns?.map((item) => {
          const quantityProduct =
            cartItems.find((cart) => cart.productId === item._id)?.quantity ||
            1;
          return (
            <>
              <div key={item.id} className="san-pham">
                <div className="ten-sp-mua">
                  <h3>Tên sản phẩm: </h3>
                  <p>{item.name}</p>
                </div>
                <div className="gia-sp">
                  <h3>Đơn giá: </h3>
                  <p>{item.designPrice} VNĐ</p>
                </div>
                <div className="so-luong">
                  <h3>Số lượng: </h3>
                  <p>{quantityProduct}</p>
                </div>
              </div>
              <Divider style={{ margin: "2px 0" }} />
            </>
          );
        })}
        <div className="tong-gia">
          <h3>Thành tiền: </h3>
          <h3>{totalPrice} VNĐ</h3>
        </div>
        <div className="xac-nhan">
          {isValid ? (
            <Form.Item>
              <Button onClick={handleSubmitOnline}>Thanh Toán</Button>
            </Form.Item>
          ) : (
            <Button disabled>Vui lòng điền đủ thông tin đơn hàng</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BillOfOrder;
