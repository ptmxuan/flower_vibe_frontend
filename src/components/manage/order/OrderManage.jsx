import "@/styles/OrderManage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Typography, Tag } from "antd";
import { format } from "date-fns";
import { useCombineDataContext } from "@/store/CombinedDataContext";

const { Title } = Typography;

export default function OrderManage() {
  const {orders, products} = useCombineDataContext();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const navigate = useNavigate();
  const findProductById = (productId) => {
    return products.find((product) => product._id === productId)
  }
  // Sample hardcoded order data
  const sampleOrders = [
    {
      _id: "ORD001",
      createdAt: "2024-11-10T10:00:00Z",
      user: { fullname: "Nguyen Van A" },
      status: 1,
      total: 500000,
    },
    {
      _id: "ORD002",
      createdAt: "2024-11-11T11:30:00Z",
      user: { fullname: "Tran Thi B" },
      status: 2,
      total: 750000,
    },
    {
      _id: "ORD003",
      createdAt: "2024-11-12T09:15:00Z",
      user: { fullname: "Le Van C" },
      status: 3,
      total: 320000,
    },
    {
      _id: "ORD004",
      createdAt: "2024-11-13T08:45:00Z",
      user: { fullname: "Pham Thi D" },
      status: 4,
      total: 150000,
    },
  ];

  // const [orders, setOrders] = useState(sampleOrders);
  const [filter, setFilter] = useState("");

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "Tên Khách Hàng",
      dataIndex: ["customer", "name"],
      key: "customerName",
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
      sortOrder:
        sortedInfo.columnKey === "customerName" ? sortedInfo.order : null,
    },
    {
      title: "Địa Chỉ",
      dataIndex: ["customer", "address"],
      key: "customerAddress",
      sorter: (a, b) =>
        a.customer.address.localeCompare(b.customer.address),
      sortOrder:
        sortedInfo.columnKey === "customerAddress" ? sortedInfo.order : null,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "items",
      key: "productNames",
      render: (items) =>
        items
          .map((item) => {
            const product = findProductById(item.productId);
            return product ? product.ten : "Sản phẩm không tìm thấy";
          })
          .join(", "),
    },
    {
      title: "Số Lượng Mua",
      dataIndex: "items",
      key: "productQuantity",
      render: (items) => {
        const totalQuantity = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return totalQuantity;
      },
    },

    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã thanh toán", value: "Đã thanh toán" },
        { text: "Đang giao hàng", value: "Đang giao hàng" },
        { text: "Chưa thanh toán", value: "Chưa thanh toán" },
        { text: "Đang chuẩn bị", value: "Đang chuẩn bị" },
        { text: "Đã nhận hàng", value: "Đã nhận hàng" },
        { text: "Đã hủy đơn hàng", value: "Đã hủy đơn hàng" },
      ],      
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
    },

    {
      title: "Chi Tiết",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => 
              navigate(`/chi-tiet-don-hang/${record._id}`, {
                state: { order: record, showHomeButton: true },
              })
            }
          >
            Xem Chi Tiết
          </Button>
        );
      },
    },
  ];

  return (
    <div className="OrderManage">
      <div className="order-manage-title">
        <Title level={2}>Quản lý đơn hàng</Title>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        pagination={{ pageSize: 8 }}
        onChange={handleChange}
        className="order-table"
      />
    </div>
  );
}
