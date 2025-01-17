import React, { createContext, useContext, useEffect, useState } from "react";
import { useProduct, useCart, useOrder, useNhapHang } from "@/hooks";
import { useUserContext } from "@/store/UserContext";

// Tạo context
const CombineDataContext = createContext();

// Tạo một provider component
export const CombineDataProvider = ({ children }) => {
  const [quantities, setQuantities] = useState({});
  const { products, getProducts } = useProduct();
  const { orders, getAllOrders, getAllOrdersWithoutUserId } = useOrder();
  const { nhapHangs, getNhapHangs } = useNhapHang();
  const { cartItems, getCart } = useCart();
  const userInfo = useUserContext();
  const userId = userInfo?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!products || products.length === 0) {
          await getProducts();
        }

        // Chỉ gọi các API khi chưa có dữ liệu và có userId
        if (!userId) return;

        // Gọi API lấy giỏ hàng nếu chưa tải
        if (!cartItems || cartItems.length === 0) {
          await getCart(userId); //cái nào có prop thì truyền vô
        }
        if (!nhapHangs || nhapHangs.length === 0) {
          await getNhapHangs();
        }

        if (!orders || orders.length === 0) {
          if (userInfo.role === "admin") {
            await getAllOrdersWithoutUserId();
          } else await getAllOrders(userId);
        }

        // Gọi API lấy tất cả đơn hàng nếu chưa tải
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [cartItems, userId, orders, products]);

  //truyền data bên trên vào value để gọi
  const value = {
    products,
    orders,
    nhapHangs,
    getNhapHangs,
    getAllOrdersWithoutUserId,
    getAllOrders,
    getProducts,
    cartItems,
    getCart,
    quantities,
    setQuantities,
  };

  return (
    <CombineDataContext.Provider value={value}>
      {children}
    </CombineDataContext.Provider>
  );
};

// Custom hook để sử dụng CombineDataContext
export const useCombineDataContext = () => {
  return useContext(CombineDataContext);
};
