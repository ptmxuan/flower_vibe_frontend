import { useApi } from "./useApi";
import { API_END_POINT } from "../constants/api-url";
import { useState, useEffect } from "react";

export const useNhapHang = () => {
  const { loading, data, error, get, post, put, del } = useApi(
    API_END_POINT.nhapHang // Replace with the appropriate endpoint for Nhập Hàng
  );
  const [nhapHangs, setNhapHangs] = useState([]);

  useEffect(() => {
    if (data) {
      setNhapHangs(data.nhapHangs);
    }
  }, [data]);

  useEffect(() => {
    getNhapHangs();
  }, []);

  // Function to get all Nhập Hàng
  const getNhapHangs = async () => {
    try {
      const result = await get();
      return result;
    } catch (err) {
      console.error("Error fetching Nhập Hàng:", err);
    }
  };

  // Function to get a single Nhập Hàng by ID
  const getNhapHangById = async (id) => {
    try {
      return await get(`/${id}`);
    } catch (err) {
      console.error(`Error fetching Nhập Hàng with ID ${id}:`, err);
    }
  };

  // Function to create a new Nhập Hàng
  const createNhapHang = async (nhapHangData) => {
    try {
      return await post(nhapHangData);
    } catch (err) {
      console.error("Error creating Nhập Hàng:", err);
    }
  };

  // Function to update a Nhập Hàng by ID
  const updateNhapHangById = async (id, nhapHangData) => {
    try {
      return await put(nhapHangData, `${API_END_POINT.nhapHang}/${id}`);
    } catch (err) {
      console.error(`Error updating Nhập Hàng with ID ${id}:`, err);
    }
  };

  // Function to delete a Nhập Hàng by ID
  const deleteNhapHangById = async (id) => {
    try {
      return await del({}, `${API_END_POINT.nhapHang}/${id}`);
    } catch (err) {
      console.error(`Error deleting Nhập Hàng with ID ${id}:`, err);
    }
  };

  return {
    loading,
    nhapHangs,
    error,
    getNhapHangs,
    getNhapHangById,
    createNhapHang,
    updateNhapHangById,
    deleteNhapHangById,
  };
};
