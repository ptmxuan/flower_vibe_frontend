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
      alert("đăng nhập nè");
    }
  }, [data, error]);

  // Đảm bảo rằng endpoint đúng và có thể gọi được
  const login = async (username, password) => {
    try {
      const response = await post({ username, password });
      console.log("Login response:", response);
      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setDataLogin(response.user);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      console.error("Error during login:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  console.log("dataLogin", dataLogin);
  return { login, loading, error, dataLogin };
};
