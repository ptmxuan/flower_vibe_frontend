import React, { useState } from "react";
import { DatePicker, Form, Input, Select, Button } from "antd";
import dayjs from "dayjs";

const TIME_OPTIONS = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

function InfoOrder({
  setIsValidAll,
  userName,
  setUserName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  selectedTime,
}) {
  const [componentSize, setComponentSize] = useState("default");
  const [isValid, setIsValid] = useState(true);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleSubmit = () => {
    if (
      !userName ||
      !phoneNumber ||
      !address ||
      !selectedDate ||
      !selectedTime
    ) {
      setIsValid(false);
      setIsValidAll(false);
    } else {
      setIsValid(true);
      setIsValidAll(true);
      console.log("Form submitted successfully");
    }
  };

  const getAvailableTimeOptions = () => {
    const now = dayjs();
    const currentDate = dayjs(selectedDate).startOf("day");
    const sixHoursLater = now.add(6, "hour");

    return TIME_OPTIONS.filter((time) => {
      const timeInDayjs = dayjs(`${currentDate.format("YYYY-MM-DD")} ${time}`, [
        "YYYY-MM-DD h:mm A",
      ]);
      return currentDate.isAfter(now, "day") || timeInDayjs.isAfter(sixHoursLater);
    });
  };

  return (
    <div className="info-order">
      <div className="title-info-order">
        <h1>Thông tin đơn hàng</h1>
      </div>
      <div className="input-info-order">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="name"
            validateStatus={!isValid && !userName ? "error" : ""}
            help={!isValid && !userName ? "Tên người nhận bị thiếu" : ""}
          >
            <Input
              style={{ width: "400px" }}
              placeholder="Tên người nhận"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            validateStatus={!isValid && !phoneNumber ? "error" : ""}
            help={!isValid && !phoneNumber ? "Số điện thoại bị thiếu" : ""}
          >
            <Input
              placeholder="Số điện thoại người nhận"
              style={{ width: "400px" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="userAddress"
            validateStatus={!isValid && !address ? "error" : ""}
            help={!isValid && !address ? "Địa chỉ người nhận bị thiếu" : ""}
          >
            <Input
              placeholder="Địa chỉ người nhận"
              style={{ width: "400px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="dateDeliver"
            validateStatus={!isValid && !selectedDate ? "error" : ""}
            help={!isValid && !selectedDate ? "Chưa chọn ngày giao" : ""}
          >
            <DatePicker
              style={{ width: "400px" }}
              placeholder="Ngày giao hoa"
              value={selectedDate}
              onChange={handleDateChange}
              disabledDate={(current) => current && current < dayjs().startOf("day")}
            />
          </Form.Item>

          <Form.Item
            name="timeDeliver"
            validateStatus={!isValid && !selectedTime ? "error" : ""}
            help={!isValid && !selectedTime ? "Chưa chọn giờ giao" : ""}
          >
            <Select
              placeholder="Giờ giao hoa"
              value={selectedTime}
              onChange={setSelectedTime}
              style={{ width: "400px" }}
            >
              {getAvailableTimeOptions().map((time) => (
                <Select.Option key={time} value={time}>
                  {time}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Input placeholder="Ghi chú" style={{ width: "400px" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default InfoOrder;
