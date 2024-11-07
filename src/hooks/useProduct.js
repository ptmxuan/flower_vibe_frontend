import { useApi } from "./useApi";
import { API_END_POINT } from "../constants/api-url";
import { useState, useEffect } from "react";

const END_POINT_URL = API_END_POINT.product;

export const useProduct = () => {
  const { loading, data, error, get, post, put, patch, del } =
    useApi(END_POINT_URL);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  // Function to get all products
  const getProducts = async () => {
    try {
      return await get();
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Function to get a single product by ID
  const getProductById = async (id) => {
    try {
      return await get(`/${id}`);
    } catch (err) {
      console.error(`Error fetching product with ID ${id}:`, err);
    }
  };

  // Function to create a new product
  const createProduct = async (productData) => {
    try {
      return await post(productData);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  // Function to update a product by ID
  const updateProductById = async (id, productData) => {
    try {
      return await put(productData, `/${id}`);
    } catch (err) {
      console.error(`Error updating product with ID ${id}:`, err);
    }
  };

  // Function to delete a product by ID
  const deleteProductById = async (id) => {
    try {
      return await del(null, `/${id}`);
    } catch (err) {
      console.error(`Error deleting product with ID ${id}:`, err);
    }
  };

  return {
    loading,
    products,
    error,
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
  };
};
