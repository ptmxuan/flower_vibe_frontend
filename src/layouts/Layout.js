import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import FlowerStoryPage from "@/pages/FlowerStoryPage";
import SearchPage from "@/pages/SearchPage";
import PolicyPage from "@/pages/PolicyPage";
import AboutUsPage from "@/pages/AboutUsPage";
import CartPage from "@/pages/CartPage";
import UserPage from "@/pages/UserPage";
import RegisterPage from "@/pages/RegisterPage";
import ProductPage from "@/pages/ProductPage";
import DetailProductPage from "@/pages/DetailProductPage";
import OrderPage from "@/pages/OrderPage";
import DesignPage from "@/pages/DesignPage";
import AccessoryPage from "@/pages/AccessoryPage";
import DetailAccessoryPage from "@/pages/DetailAccessoryPage";
import AdminPage from "@/pages/AdminPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
function Layout() {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<FlowerStoryPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/dieu-khoan" element={<PolicyPage />} />
          <Route path="/thong-tin-cua-hang" element={<AboutUsPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/nguoi-dung" element={<UserPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/san-pham" element={<ProductPage />} />
          <Route path="/san-pham/:id" element={<DetailProductPage />} />
          <Route path="/don-hang" element={<OrderPage />} />
          <Route path="/thiet-ke" element={<DesignPage />} />
          <Route path="/phu-kien" element={<AccessoryPage />} />
          <Route path="/phu-kien/:id" element={<DetailAccessoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/vnpay_return" element={<PaymentSuccessPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Layout;
