import { useApi } from "./useApi";
import { useState, useEffect } from "react";
import { API_END_POINT } from "@/constants/api-url";

const END_POINT = API_END_POINT.design;

export const useDesign = () => {
  const { get, post, put, del, data, loading, error } = useApi(END_POINT);
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    if (data) {
      setDesigns(data.designs);
    }
  }, [data]);

  const getDesignByUserId = async (userId) => {
    try {
      await get(`/user/${userId}`);
    } catch (err) {
      console.error("Error fetching design:", err);
    }
  };

  const getAllDesign = async () => {
    try {
      await get("/");
    } catch (err) {
      console.error("Error fetching all designs:", err);
    }
  };

  const createDesign = async (
    userId,
    name,
    imageBase64,
    materials,
    designPrice
  ) => {
    try {
      const designData = { userId, name, imageBase64, materials, designPrice };

      await post(designData);
    } catch (err) {
      console.error("Error creating design:", err);
    }
  };

  const deleteDesign = async (userId, designId) => {
    try {
      const payload = { userId, designId };
      console.log("payload", payload);
      await del(payload);
    } catch (err) {
      console.error("Error deleting design:", err);
    }
  };

  return {
    designs,
    loading,
    error,
    data,
    getAllDesign,
    getDesignByUserId,
    createDesign,
    deleteDesign,
  };
};
