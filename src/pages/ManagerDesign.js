import React, { useEffect } from "react";
import { Button, Table, Space, notification } from "antd"; // Assuming `post` is a utility function for API calls
import "@/styles/ManagerDesign.scss";
import { useCart, useDesign } from "@/hooks";
import { useUserContext } from "@/store";
import { useCombineDataContext } from "@/store/CombinedDataContext";

function ManagerDesign() {
  const userInfo = useUserContext();

  const userId = userInfo?._id;

  const { addToCart } = useCart();

  const { getCart } = useCombineDataContext();

  const { designs, getDesignByUserId, deleteDesign } = useDesign();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await getDesignByUserId(userId);
      }
    };
    fetchData();
  }, [userId]);

  const handleAddToCart = async (userId, itemType, productId, quantity) => {
    await addToCart(userId._id, itemType, productId, quantity);
    await getCart(userId);
    notification.success({
      message: "Thêm vào giỏ hàng thành công",
      description: "Thêm vào giỏ hàng thành công",
      placement: "bottomRight",
    });
  };

  const handleDeleteDesign = async (designId) => {
    await deleteDesign(userId, designId);
    await getDesignByUserId(userId);
  };

  const columns = [
    {
      title: "Tên thiết kế",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Design" style={{ width: 100 }} />
      ),
    },
    {
      title: "Giá thiết kế",
      dataIndex: "designPrice",
      key: "designPrice",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Thành phần",
      dataIndex: "materials",
      key: "materials",
      render: (materials) => (
        <ul>
          {materials.map((material, index) => (
            <li key={index}>
              {material.name}: {material.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle" align="center" direction="vertical">
          <Button type="danger" onClick={() => handleDeleteDesign(record._id)}>
            Xóa thiết kế
          </Button>
          <Button
            type="primary"
            onClick={() =>
              handleAddToCart(record.userId, "design", record._id, 1)
            }
          >
            Thêm vào giỏ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="design-details-page">
      <h1>Quản lý thiết kế</h1>
      <div className="design-details-title">
        <Table
          className="design-details-table"
          columns={columns}
          dataSource={designs}
          pagination={false}
          rowKey="designId"
          locale={{
            emptyText: "Không có thiết kế nào.",
          }}
        />
      </div>
    </div>
  );
}

export default ManagerDesign;
