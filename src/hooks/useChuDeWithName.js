import { useApi } from "./useApi";
import { API_END_POINT } from "../constants/api-url";
import { useState, useEffect } from "react";

export const useChuDeWithName = () => {
  const { loading, data, error, get } = useApi(API_END_POINT.chuDe);
  const [chuDesWithName, setChuDesWithName] = useState([]);

  useEffect(() => {
    if (data) {
      setChuDesWithName(data);
    }
  }, [data]);

  useEffect(() => {
    getChuDesbyName("Nguyên vật liệu thiết kế hoa");
  }, []);

  const getChuDesbyName = async (name) => {
    try {
      const result = await get(`/ten/${name}`);
      return result;
    } catch (err) {
      console.error("Error fetching ChuDe:", err);
    }
  };

  return {
    loading,
    chuDesWithName,
    error,
    getChuDesbyName,
  };
};
