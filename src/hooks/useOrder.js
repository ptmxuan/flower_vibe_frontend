import { useApi } from "./useApi";
import { useState, useEffect } from "react";
import { API_END_POINT } from "@/constants/api-url";

const END_POINT = API_END_POINT.order; // Đường dẫn API cho đơn hàng

export const useOrder = () => {
  // Khởi tạo hook useApi với endpoint cho đơn hàng
  const { loading, data, error, get, post, put, del } = useApi(END_POINT);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (data) {
      setOrders(data); // Cập nhật danh sách đơn hàng
    }
  }, [data]);

  // Lấy tất cả đơn hàng
  const getAllOrders = async (userId) => {
    try {
      await get(`/${userId}`);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Lấy chi tiết đơn hàng theo ID
  const getOrderById = async (_id) => {
    try {
      await get(`/${_id}`); // Gọi API với ID
      console.log("getOrderById", data);
    } catch (err) {
      console.error(`Error fetching order with ID ${_id}:`, err);
    }
  };

  // Tạo đơn hàng mới
  const createOrder = async (orderData) => {
    return await post(orderData)
      .then((res) => {
        setOrders((prevOrders) => [...prevOrders, data]); // Cập nhật danh sách đơn hàng
        // return data;
      })
      .catch((err) => console.error("Error creating order:", err));
  };
  const updateOrderStatus = async (orderId, status) => {
    return await put({ status }, `${END_POINT}/update/${orderId}`)
      .then((res) => {
        setOrders((prevOrders) =>
          prevOrders?.orders?.map((o) =>
            o._id === orderId ? res.data.order : o
          )
        );
      })
      .catch((err) => console.error("Error updating order status:", err));
  };
  // Cập nhật đơn hàng theo ID
  const updateOrder = async (id, orderData) => {
    return await put(orderData, `/${id}`)
      .then((res) => {
        setOrders(
          (prevOrders) => prevOrders.map((o) => (o._id === id ? res.data : o)) // Cập nhật đơn hàng đã thay đổi
        );
        // return res.data;
      })
      .catch((err) => console.error("Error updating order:", err));
  };

  // Xóa đơn hàng theo ID
  const deleteOrder = async (id) => {
    return await del({}, `/${id}`)
      .then(() => {
        setOrders((prevOrders) => prevOrders.filter((o) => o._id !== id)); // Cập nhật danh sách đơn hàng
      })
      .catch((err) => console.error("Error deleting order:", err));
  };

  return {
    loading,
    error,
    orders,
    order,
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
  };
};
