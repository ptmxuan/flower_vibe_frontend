import React, { createContext, useContext, useEffect } from "react";
import { useProduct } from "@/hooks"; // Import useRental
// import { useUserContext } from "@/store/UserContext";

// Tạo context
const CombineDataContext = createContext();

// Tạo một provider component
export const CombineDataProvider = ({ children }) => {
  const { products, getProducts } = useProduct();

  // const userInfor = useUserContext();

  // const userId = userInfor?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chỉ gọi các API khi chưa có dữ liệu và có userId
        // if (!userId) return;

        // Gọi API lấy giỏ hàng nếu chưa tải

        // Gọi API lấy tất cả sản phẩm nếu chưa tải
        if (!products || products.length === 0) {
          await getProducts();
        }

        // Gọi API lấy tất cả đơn hàng nếu chưa tải
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []); // Thêm dependencies để kiểm soát việc gọi API
  //truyền data bên trên vào value để gọi
  const value = {
    products,
    getProducts,
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
