import { useApi } from "./useApi";
import { API_END_POINT } from "@/constants/api-url";
import { useState, useEffect } from "react";

const END_POINT_URL = `${API_END_POINT.user}/login`;

export const useLogin = () => {
  const { post, loading, error, data } = useApi(END_POINT_URL);
  const [dataLogin, setDataLogin] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Login error:", error);
      return;
    }

    if (data && data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setDataLogin(data.user);
    }
  }, [data, error]);

  // Đảm bảo rằng endpoint đúng và có thể gọi được
  const login = async (username, password) => {
    try {
      const response = await post({ username, password });
      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setDataLogin(response.user);
        return "success";
      } else {
        return response.error;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      console.error("Error during login:", errorMessage);
      return false;
    }
  };

  return { login, loading, error, dataLogin };
};
