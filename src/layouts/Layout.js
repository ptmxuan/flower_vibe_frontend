import AboutUsPage from "@/pages/AboutUsPage";
import AccessoryPage from "@/pages/AccessoryPage";
import AdminPage from "@/pages/AdminPage";
import CartPage from "@/pages/CartPage";
import DesignPage from "@/pages/DesignPage";
import DetailAccessoryPage from "@/pages/DetailAccessoryPage";
import DetailProductPage from "@/pages/DetailProductPage";
import FlowerStoryPage from "@/pages/FlowerStoryPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OrderPage from "@/pages/OrderPage";
import PolicyPage from "@/pages/PolicyPage";
import ProductPage from "@/pages/ProductPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import UserPage from "@/pages/UserPage";
import { Spin } from "antd";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Layout;
