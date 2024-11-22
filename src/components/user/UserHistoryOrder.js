import { Table, Tooltip } from "antd";
import { useOrder } from "@/hooks/useOrder";
import { useUserContext } from "@/store/UserContext";
import { useEffect } from "react";

function UserHistoryOder() {
  const userInfo = useUserContext();
  const { orders, getAllOrders } = useOrder();

  useEffect(() => {
    console.log("userInfo", userInfo);
    if (userInfo) {
      getAllOrders(userInfo._id);
    }
  }, [userInfo]);

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Tooltip title={text}><span>{text}</span></Tooltip>,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "customer",
      key: "customer-address",
      render: (customer) => (
        <Tooltip title={customer ? customer.address : "N/A"}>
          <span>{customer ? customer.address : "N/A"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <Tooltip title={items.map((item) => `${item.quantity} x ${item.productId}`).join(", ")}>
          <span>{items.map((item) => `${item.quantity} x ${item.productId}`).join(", ")}</span>
        </Tooltip>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tooltip title={status}>
          <span>{status}</span>
        </Tooltip>
      ),
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (orderDate) => (
        <Tooltip title={orderDate}>
          <span>{orderDate}</span>
        </Tooltip>
      ),
    },
    {
      title: "Giờ Giao Hàng",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
      render: (deliveryTime) => (
        <Tooltip className="" title={deliveryTime}>
          <span>{deliveryTime}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="user-history-order">
      <div className="title-history-order">
        <h1>Lịch sử đặt hàng</h1>
      </div>
      <div className="history-order">
        {orders && orders.length > 0 ? (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            pagination={false}
          />
        ) : (
          <p>Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
}

export default UserHistoryOder;
