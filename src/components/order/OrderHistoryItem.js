import React from "react";
import { Card, Tag, Typography, Row, Col, Button } from "antd";
import { format } from "date-fns";
const { Text } = Typography;
const OrderHistoryItem = ({ order, onViewDetails }) => {
  const formattedDate = format(
    new Date(order.createdAt),
    "dd/MM/yyyy HH:mm:ss"
  );
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "green";
      case "Chờ xử lý":
        return "orange";
      case "Thất bại":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Card style={{ marginBottom: 16 }} bordered>
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <Text strong>Mã đơn hàng:</Text> <br />
          <Text>{order._id}</Text>
        </Col>
        <Col span={6}>
          <Text strong>Ngày đặt:</Text> <br />
          <Text>{formattedDate}</Text>
        </Col>
        <Col span={6}>
          <Text strong>Trạng thái thanh toán:</Text> <br />
          <Tag color={getStatusColor()}>{order.status}</Tag>
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <Button type="primary" onClick={onViewDetails}>
            Xem chi tiết
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderHistoryItem;
