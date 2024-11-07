import React, { useState } from "react";
import { DatePicker, Form, Input, Select, Button } from "antd";

function InfoOrder({
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

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="info-order">
      <div className="title-info-order">
        <h1>Thông tin đơn hàng</h1>
      </div>
      <div className="input-info-order">
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Tên người nhận bị thiếu" }]}
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
            rules={[
              { required: true, message: "Số điện thoại bị thiếu" },
              {
                pattern: /^[0-9]*$/,
                message: "Chỉ được nhập số!",
              },
              {
                pattern: /^(0[3|5|7|8|9]|[1-9][0-9])[0-9]{8}$/,
                message: "Số điện thoại không hợp lệ! (VD: 0123456789)",
              },
            ]}
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
            rules={[{ required: true, message: "Địa chỉ người nhận bị thiếu" }]}
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
            rules={[{ required: true, message: "Chưa chọn ngày giao" }]}
          >
            <DatePicker
              style={{ width: "400px" }}
              placeholder="Ngày giao hoa"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Form.Item>
          <Form.Item
            name="timeDeliver"
            rules={[{ required: true, message: "Chưa chọn giờ giao" }]}
          >
            <Select
              placeholder="Giờ giao hoa"
              value={selectedTime}
              onChange={setSelectedTime}
              style={{ width: "400px" }}
            >
              <Select.Option value="7:00 AM">7:00 AM</Select.Option>
              <Select.Option value="8:00 AM">8:00 AM</Select.Option>
              <Select.Option value="9:00 AM">9:00 AM</Select.Option>
              <Select.Option value="10:00 AM">10:00 AM</Select.Option>
              <Select.Option value="11:00 AM">11:00 AM</Select.Option>
              <Select.Option value="12:00 PM">12:00 PM</Select.Option>
              <Select.Option value="1:00 PM">1:00 PM</Select.Option>
              <Select.Option value="2:00 PM">2:00 PM</Select.Option>
              <Select.Option value="3:00 PM">3:00 PM</Select.Option>
              <Select.Option value="4:00 PM">4:00 PM</Select.Option>
              <Select.Option value="5:00 PM">5:00 PM</Select.Option>
              <Select.Option value="6:00 PM">6:00 PM</Select.Option>
              <Select.Option value="7:00 PM">7:00 PM</Select.Option>
              <Select.Option value="8:00 PM">8:00 PM</Select.Option>
              <Select.Option value="9:00 PM">9:00 PM</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input placeholder="Ghi chú" style={{ width: "400px" }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Xác nhận</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default InfoOrder;
