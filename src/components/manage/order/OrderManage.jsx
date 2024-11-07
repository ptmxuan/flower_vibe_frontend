import "./OrderManage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

export default function OrderManage() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [fillter, setFillter] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setOrders(
      allOrders.filter((item) => {
        if (fillter === "") return item;
        else {
          if (fillter === 1) {
            return item.status === 1;
          } else if (fillter === 2) {
            return item.status === 2;
          } else if (fillter === 3) {
            return item.status === 3;
          } else {
            return item.status === 4;
          }
        }
      })
    );
  }, [fillter, allOrders]);

  return (
    <div className="OrderManage">
      <div className="order-manage-title">
        <p>Quản lý đơn hàng</p>
      </div>
      <div className="select-status">
        <h5>Loại sản phẩm</h5>
        <div className="filter-status">
          {[1, 2, 3, 4].map((status) => (
            <button key={status} onClick={() => setFillter(status)}>
              {status === 1
                ? "Đã xác nhận"
                : status === 2
                ? "Đã giao hàng"
                : status === 3
                ? "Đã gửi hàng"
                : "Chưa được xác nhận"}
            </button>
          ))}
        </div>

        <button className="btn-reset" onClick={() => setFillter("")}>
          Đặt lại
        </button>
      </div>

      <div className="orderlist">
        <table className="table-order">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày tạo</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Giá đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item) => {
                const formattedDate = format(
                  new Date(item.createdAt),
                  "dd/MM/yyyy"
                );
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{formattedDate}</td>
                    <td>{item.user.fullname}</td>
                    <td
                      className={
                        item.status === 1
                          ? "confirmed"
                          : item.status === 2
                          ? "delivery"
                          : item.status === 3
                          ? "received"
                          : "default"
                      }
                    >
                      {item.status === 1
                        ? "Đã xác nhận"
                        : item.status === 2
                        ? "Đã giao hàng"
                        : item.status === 3
                        ? "Đã gửi hàng"
                        : "Chưa được xác nhận"}
                    </td>
                    <td>{Number.parseFloat(item.total).toFixed(3) + " vnd"}</td>
                    <td>
                      <Link to={`/orderdetail?orderId=${item._id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
