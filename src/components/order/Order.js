import InfoOrder from "./InfoOrder";
import BillOfOrder from "./BillOfOrder";
import { Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import moment from "moment";
import { useUserContext } from "@/store/UserContext";
import { useDesign } from "@/hooks/useDesign";

function Order() {
  const location = useLocation();
  const { cartItemDefaults, cartItemDesign, totalPrice } = location.state || {};

  const { products } = useCombineDataContext();
  const { designs, getDesignByUserId } = useDesign();
  const userInfo = useUserContext();
  const userId = userInfo?._id;

  const [isValid, setIsValid] = useState(false);

  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartDesigns, setCartDesigns] = useState([]);

  const formattedDate = selectedDate
    ? moment(selectedDate.$d).format("DD-MM-YYYY")
    : null;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await getDesignByUserId(userId);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (cartItemDefaults) {
      const productIds = cartItemDefaults.map((item) => item.productId);
      const filteredProducts = products?.filter((product) =>
        productIds.includes(product._id)
      );
      setCartProducts(filteredProducts);
    }
  }, [cartItemDefaults, products]);

  useEffect(() => {
    if (cartItemDesign) {
      const productIds = cartItemDesign.map((item) => item._id);
      const filteredProducts = designs?.filter((product) =>
        productIds.includes(product._id)
      );
      setCartDesigns(filteredProducts);
    }
  }, [cartItemDesign, designs]);

  return (
    <Row>
      <Col span={12}>
        <div className="order-left">
          <InfoOrder
            setIsValidAll={setIsValid}
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
            isValid={isValid}
            totalPrice={totalPrice}
            userName={userName}
            address={address}
            phoneNumber={phoneNumber}
            cartProducts={cartProducts}
            cartDesigns={cartDesigns}
            cartItems={cartItemDefaults}
            formattedDate={formattedDate}
            selectedTime={selectedTime}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Order;
