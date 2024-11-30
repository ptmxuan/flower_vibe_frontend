import { useApi } from "./useApi";
import { API_END_POINT } from "../constants/api-url";
import { useState, useEffect } from "react";

export const useChuDe = () => {
  const { loading, data, error, get, post, put, del } = useApi(
    API_END_POINT.chuDe // Thay đổi endpoint phù hợp với `ChuDe`
  );
  const [chuDes, setChuDes] = useState([]);

  useEffect(() => {
    if (data) {
      setChuDes(data.chuDes);
    }
  }, [data]);

  useEffect(() => {
    getChuDes();
  }, []);

  // Function to get all ChuDe
  const getChuDes = async () => {
    try {
      const result = await get();
      return result;
    } catch (err) {
      console.error("Error fetching ChuDe:", err);
    }
  };

  // Function to get a single ChuDe by ID
  const getChuDeById = async (id) => {
    try {
      return await get(`/${id}`);
    } catch (err) {
      console.error(`Error fetching ChuDe with ID ${id}:`, err);
    }
  };

  // Function to create a new ChuDe
  const createChuDe = async (chuDeData) => {
    try {
      await post(chuDeData);
      return true;
    } catch (err) {
      console.error("Error creating ChuDe:", err);
    }
  };

  // Function to update a ChuDe by ID
  const updateChuDeById = async (id, chuDeData) => {
    try {
      return await put(chuDeData, `${API_END_POINT.chuDe}/${id}`);
    } catch (err) {
      console.error(`Error updating ChuDe with ID ${id}:`, err);
    }
  };

  // Function to delete a ChuDe by ID
  const deleteChuDeById = async (id) => {
    try {
      return await del({}, `${API_END_POINT.chuDe}/${id}`);
    } catch (err) {
      console.error(`Error deleting ChuDe with ID ${id}:`, err);
    }
  };

  return {
    loading,
    chuDes,
    error,
    getChuDes,
    getChuDeById,
    createChuDe,
    updateChuDeById,
    deleteChuDeById,
  };
};
