import React, { createContext, useState } from "react";
import { notification } from "antd";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].cartQuantity =
          product.cartQuantity ?? 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          { ...product, cartQuantity: product.cartQuantity ?? 1 },
        ];
      }
    });

    notification.success({
      message: "Thông báo",
      description: "Thêm thành công sản phẩm vào giỏ hàng",
      placement: "bottomRight",
      duration: 3,
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, setCartItems, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
