import { useState } from "react";
import { useApi } from "./useApi";
import { API_END_POINT } from "@/constants/api-url";

export const useChangePassword = () => {
  const { put, loading, error } = useApi(API_END_POINT.user);

  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      const response = await put(
        {
          currentPassword,
          newPassword,
        },
        `${API_END_POINT.user}/${userId}/change-password`
      );

      console.log("response", response);
      if (response && response.message) {
        return { success: true, message: response.message };
      } else {
        return {
          success: false,
          error: response.error || "Đổi mật khẩu thất bại",
        };
      }
    } catch (err) {
      console.error("Error during change password:", err);
      return {
        success: false,
        error: err.response?.data?.error || "Lỗi khi thay đổi mật khẩu",
      };
    }
  };

  return { changePassword, isSubmitting: loading, loading, error };
};
