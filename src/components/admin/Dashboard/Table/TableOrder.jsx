import "./Table.scss";
import { useState, useEffect } from "react";
import { Table, Button, Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import { format } from "date-fns";

const { Title } = Typography;

export default function TableOrder() {
  const { orders, products } = useCombineDataContext();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const navigate = useNavigate();

  // Lấy sản phẩm theo ID
  const findProductById = (productId) => {
    return products.find((product) => product._id === productId);
  };

  // Lọc lấy 5 đơn hàng gần nhất
  const recentOrders = orders.slice(-5);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Định nghĩa các cột của bảng
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
      render: (status) => {
        let color;
        let text;
        switch (status) {
          case "Đã thanh toán":
            color = "green";
            text = "Đã thanh toán";
            break;
          case "Đang giao hàng":
            color = "blue";
            text = "Đang giao hàng";
            break;
          case "Chưa thanh toán":
            color = "orange";
            text = "Chưa thanh toán";
            break;
          case "Đang chuẩn bị" :
            color = "pink"
            text = "Đang chuẩn bị";
            break;
          case "Đã nhận hàng":
            color = "yellow"
            text = "Đã nhận hàng";
            break;
          case "Đã hủy đơn hàng":
            color = "red";
            text = "Đã hủy đơn hàng";
            break;
          default:
            color = "gray";
            text = "Chưa xác định";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => format(new Date(createdAt), "dd/MM/yyyy HH:mm"),
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
    <div className="Table">
      <Table
        columns={columns}
        dataSource={recentOrders}
        rowKey="_id"
        onChange={handleChange}
        className="order-table"
        pagination={false}  // Bỏ pagination
      />
    </div>
  );
}
