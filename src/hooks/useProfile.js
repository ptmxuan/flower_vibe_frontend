import { useApi } from "./useApi";
import { API_END_POINT } from "@/constants/api-url";
import { useState, useEffect } from "react";

export const useProfile = () => {
  const { put, loading, error, data } = useApi(API_END_POINT.user);
  const [dataProfile, setDataProfile] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (data && data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setDataProfile(data.user);
    }
  }, [data, error]);

  const updateProfile = async (userId, updatedData) => {
    try {
      const response = await put({ ...updatedData }, `${API_END_POINT.user}/${userId}`);
      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setDataProfile(response.user);
        return 'success';
      } else {
        return response?.data?.error || 'Unknown error';
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Update failed";
      console.error("Error during profile update:", errorMessage);
      setUpdateError(errorMessage);
      return false;
    }
  };

  return { updateProfile, loading, error, updateError, dataProfile };
};
