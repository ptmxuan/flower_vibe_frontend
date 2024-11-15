import InfoOrder from "./InfoOrder";
import BillOfOrder from "./BillOfOrder";
import { Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import moment from "moment";
function Order() {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const { products } = useCombineDataContext();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  const formattedDate = selectedDate
    ? moment(selectedDate.$d).format("DD-MM-YYYY")
    : null;
  useEffect(() => {
    if (cartItems) {
      const productIds = cartItems.map((item) => item.productId);
      const filteredProducts = products?.filter((product) =>
        productIds.includes(product._id)
      );
      setCartProducts(filteredProducts);
    }
  }, [cartItems, products]);
  return (
    <Row>
      <Col span={12}>
        <div className="order-left">
          <InfoOrder
            userName={userName}
            setUserName={setUserName}
            address={address}
            setAddress={setAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </Col>
      <Col span={12}>
        <div className="order-right">
          <BillOfOrder
            totalPrice={totalPrice}
            userName={userName}
            address={address}
            phoneNumber={phoneNumber}
            cartProducts={cartProducts}
            cartItems={cartItems}
            formattedDate={formattedDate}
            selectedTime={selectedTime}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Order;
