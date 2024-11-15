import { useApi } from "./useApi";
import { useState, useEffect } from "react";
import { API_END_POINT } from "@/constants/api-url";

const END_POINT = API_END_POINT.cart;

export const useCart = () => {
  const { get, post, put, del, data, loading, error } = useApi(END_POINT);
  const [cartItems, setCartItems] = useState([]);
  //nhớ useEffect để cập nhật State nhé bé
  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  // Lấy giỏ hàng của người dùng
  const getCart = async (userId) => {
    try {
      await get(`/${userId}`);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (userId, productId, quantity) => {
    try {
      await post({ userId, productId, quantity }, `${END_POINT}/addToCart`); //api/cart/addToCart

      setCartItems((prevItems) => {
        const newItem = data;
        const currentItems = Array.isArray(prevItems) ? prevItems : [];
        return [...currentItems, newItem]; // Thêm sản phẩm mới vào
      });
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (userId, productIds) => {
    // productIds là một mảng
    try {
      // Gọi API để xóa sản phẩm
      await del({ userId, productIds }, `${END_POINT}/remove`); // Gửi mảng productIds

      // Cập nhật cartItems sau khi xóa sản phẩm
      setCartItems((prevCart) => ({
        ...prevCart,
        items: prevCart?.items?.filter(
          (item) => !productIds.includes(item.productId)
        ),
      }));
    } catch (err) {
      console.error("Error removing product from cart:", err);
    }
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItem = async (userId, productId, quantity) => {
    try {
      await put({ userId, productId, quantity }, `${END_POINT}/update`);

      setCartItems((prevCart) => ({
        ...prevCart,
        items: prevCart?.items?.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  };

  return {
    loading,
    error,
    cartItems, //trả State ở đây nhen
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
  };
};
