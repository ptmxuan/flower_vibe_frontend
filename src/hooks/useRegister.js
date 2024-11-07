import { useApi } from "./useApi"; // Đường dẫn của useApi
import { API_END_POINT } from "@/constants/api-url"; // Đường dẫn của API_END_POINT
import { useState } from "react";

const END_POINT_URL = API_END_POINT.user;

export const useRegister = () => {
  const { post, loading, data, error } = useApi(END_POINT_URL);
  const [success, setSuccess] = useState(false);

  const register = async (userData) => {
    setSuccess(false); // Reset trạng thái thành công trước khi gửi yêu cầu
    try {
      console.log("userData", userData);
      await post(userData);
      setSuccess(true); // Đánh dấu đăng ký thành công
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return { register, loading, data, error, success };
};
