import { useApi } from "./useApi";
import { API_END_POINT } from "@/constants/api-url";
import { useState, useEffect } from "react";

export const useProfile = () => {
  const { get, del, put, loading, error, data } = useApi(API_END_POINT.user);
  const [dataProfile, setDataProfile] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setDataProfile(data);
    }
  }, [data, error]);

  const updateProfile = async (userId, updatedData) => {
    try {
      const response = await put(
        { ...updatedData },
        `${API_END_POINT.user}/${userId}`
      );
      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setDataProfile(response.user);
        return "success";
      } else {
        return response?.data?.error || "Unknown error";
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Update failed";
      console.error("Error during profile update:", errorMessage);
      setUpdateError(errorMessage);
      return false;
    }
  };
  const getAllUsers = async () => {
    try {
      await get();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const deleteUser = (id) => {
    return del({}, `${API_END_POINT.user}/${id}`)
      .then(() => {
        setDataProfile((prevUsers) => prevUsers.filter((u) => u._id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };
  return {
    updateProfile,
    getAllUsers,
    deleteUser,
    loading,
    error,
    updateError,
    dataProfile,
  };
};
