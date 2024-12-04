import { Typography, Table } from "antd";
import React, { useContext, useState, useEffect } from "react";
import "./TotalPrice.scss";
import { AppContext } from "../../AppContext";
import { useChuDeWithName } from "@/hooks/useChuDeWithName";
import InfoIconWithModal from "./InfoPrice";

const { Title } = Typography;

export const TotalPrice = () => {
  const { ingreds, setFinalCost } = useContext(AppContext);
  const { chuDesWithName } = useChuDeWithName();

  const [designCost, setDesignCost] = useState(0);
  const [materialPrice, setMaterialPrice] = useState(0);

  const getGia = (ten) => {
    if (chuDesWithName?.sanPhams?.length) {
      const item = chuDesWithName?.sanPhams.find((item) => item.ten === ten);
      return item?.gia ? item.gia : 0;
    }
    return 0;
  };

  const groupedIngreds = Object.values(
    ingreds.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = { ...item, quantity: 1 };
      } else {
        acc[item.type].quantity += 1;
      }
      return acc;
    }, {})
  ).map((item) => ({
    ...item,
    type: `(${item.quantity}) x ${item.type}`,
  }));

  // Calculate material price
  useEffect(() => {
    if (chuDesWithName?.sanPhams?.length) {
      const totalMaterialPrice = groupedIngreds.reduce((total, item) => {
        const originalName = item.type.replace(/\(\d+\) x /, "");
        const itemPrice = getGia(originalName);
        return total + itemPrice * item.quantity;
      }, 0);
      setMaterialPrice(totalMaterialPrice);
    }
  }, [ingreds, chuDesWithName, groupedIngreds]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Đơn giá",
      key: "gia",
      render: (text, record) => (
        <span>
          {getGia(record.type.replace(/\(\d+\) x /, "")).toLocaleString()} VNĐ
        </span>
      ),
    },
  ];

  useEffect(() => {
    setFinalCost(materialPrice + designCost);
  }, [materialPrice]);

  return (
    <div className="total-price">
      <Title level={5}>Chi phí</Title>
      <Table
        size="small"
        dataSource={groupedIngreds}
        columns={columns}
        rowKey="type"
        pagination={false}
        bordered
        locale={{
          emptyText: "Không có dữ liệu để hiển thị",
        }}
      />
      <InfoIconWithModal
        number={ingreds.length}
        setDesignCost={setDesignCost}
      />
      <Title level={5}>
        Chi phí nguyên vật liệu: {materialPrice?.toLocaleString()} VNĐ
      </Title>
      <Title level={5}>
        Tổng chi phí: {(designCost + materialPrice)?.toLocaleString()} VNĐ
      </Title>
    </div>
  );
};
