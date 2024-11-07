import InfoOrder from "./InfoOrder";
import BillOfOrder from "./BillOfOrder";
import { Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
function Order() {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const location = useLocation();
  const cartItems = location.state?.cartItems || {};
  const formattedDate = selectedDate
    ? moment(selectedDate.$d).format("DD-MM-YYYY")
    : null;

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
            userName={userName}
            address={address}
            phoneNumber={phoneNumber}
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
