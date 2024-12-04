import React, { useState } from "react";
import { Modal, Table, Button, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { pricingRules } from "@/constants/pricingRules";

const { Title } = Typography;

const InfoIconWithModal = ({ number, setDesignCost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricingColumns = [
    {
      title: "Số lượng hoa",
      dataIndex: "range",
      key: "range",
    },
    {
      title: "Chi phí",
      key: "cost",
      render: (text, record) => (
        <span>{record?.cost?.toLocaleString()} VNĐ</span>
      ),
    },
  ];

  const pricingData = pricingRules.map((rule, index) => ({
    key: index,
    range:
      rule.maxQuantity === Infinity ? "> 20 hoa" : `<= ${rule.maxQuantity} hoa`,
    cost: rule.cost,
  }));

  const calculateCost = (quantity) => {
    const matchingRule = pricingRules.find(
      (rule) => quantity <= rule.maxQuantity
    );
    setDesignCost(matchingRule ? matchingRule.cost : 0);
    return matchingRule ? matchingRule.cost : 0;
  };

  const totalCost = calculateCost(number);

  return (
    <>
      <Title level={5}>
        Chi phí thiết kế: {totalCost?.toLocaleString()} VNĐ
        <InfoCircleOutlined
          style={{ cursor: "pointer", marginLeft: 8, color: "#1890ff" }}
          onClick={() => setIsModalOpen(true)}
        />
        <Modal
          title="Chính sách chi phí của chúng tôi"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalOpen(false)}>
              Đóng
            </Button>,
          ]}
        >
          <p>
            Thiết kế của bạn sẽ được hoàn thành thủ công bởi đội ngũ nhân viên
            của chúng tôi, tùy thuộc vào số lượng hoa trong thiết kế của bạn mà
            chúng tôi sẽ phụ thu thêm với chi phí như bảng dưới đây.
          </p>
          <p>
            <i>Chi phí thiết kế đã bao gồm bó hoa (20,000 VNĐ)</i>
          </p>
          <Table
            size="small"
            dataSource={pricingData}
            columns={pricingColumns}
            pagination={false}
            bordered
          />
        </Modal>
      </Title>
    </>
  );
};

export default InfoIconWithModal;
