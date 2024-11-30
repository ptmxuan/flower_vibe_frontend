import { useApi } from "./useApi";
import { API_END_POINT } from "../constants/api-url";
import { useState, useEffect } from "react";

export const useNhaCungCap = () => {
  const { loading, data, error, get, post, put, del } = useApi(
    API_END_POINT.nhaCungCap // Thay đổi endpoint phù hợp với `NhaCungCap`
  );
  const [nhaCungCaps, setNhaCungCaps] = useState([]);

  useEffect(() => {
    if (data) {
      setNhaCungCaps(data);
    }
  }, [data]);

  useEffect(() => {
    getNhaCungCaps();
  }, []);

  // Function to get all NhaCungCap
  const getNhaCungCaps = async () => {
    try {
      const result = await get();
      return result;
    } catch (err) {
      console.error("Error fetching NhaCungCap:", err);
    }
  };

  // Function to get a single NhaCungCap by ID
  const getNhaCungCapById = async (id) => {
    try {
      return await get(`/${id}`);
    } catch (err) {
      console.error(`Error fetching NhaCungCap with ID ${id}:`, err);
    }
  };

  // Function to create a new NhaCungCap
  const createNhaCungCap = async (nhaCungCapData) => {
    try {
      await post(nhaCungCapData);
      return true;
    } catch (err) {
      console.error("Error creating NhaCungCap:", err);
    }
  };

  // Function to update a NhaCungCap by ID
  const updateNhaCungCapById = async (id, nhaCungCapData) => {
    try {
      return await put(nhaCungCapData, `${API_END_POINT.nhaCungCap}/${id}`);
    } catch (err) {
      console.error(`Error updating NhaCungCap with ID ${id}:`, err);
    }
  };

  // Function to delete a NhaCungCap by ID
  const deleteNhaCungCapById = async (id) => {
    try {
      return await del({}, `${API_END_POINT.nhaCungCap}/${id}`);
    } catch (err) {
      console.error(`Error deleting NhaCungCap with ID ${id}:`, err);
    }
  };

  return {
    loading,
    nhaCungCaps,
    error,
    getNhaCungCaps,
    getNhaCungCapById,
    createNhaCungCap,
    updateNhaCungCapById,
    deleteNhaCungCapById,
  };
};
