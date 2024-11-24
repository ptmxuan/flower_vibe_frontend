import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";

import { CartProvider, CombineDataProvider, UserProvider } from "@/store";

import useFacebookSDK from "./hooks/useFacebookSDK";

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
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import PolicyPage from "@/pages/PolicyPage";
import ProductPage from "@/pages/ProductPage";
import RegisterPage from "@/pages/RegisterPage";
import UserPage from "@/pages/UserPage";
import MainLayout from "layouts/MainLayout";
import EmptyLayout from "layouts/EmptyLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <UserProvider>
      <CombineDataProvider>
        <CartProvider>
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
              <AppContent />
            </Router>
          </Suspense>
        </CartProvider>
      </CombineDataProvider>
    </UserProvider>
  );
}

function AppContent() {

  useFacebookSDK();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<FlowerStoryPage />} />
        <Route path="/dieu-khoan" element={<PolicyPage />} />
        <Route path="/thong-tin-cua-hang" element={<AboutUsPage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/nguoi-dung" element={<UserPage />} />
        <Route path="/san-pham" element={<ProductPage />} />
        <Route path="/san-pham/:id" element={<DetailProductPage />} />
        <Route path="/don-hang" element={<OrderPage />} />
        <Route path="/phu-kien" element={<AccessoryPage />} />
        <Route path="/phu-kien/:id" element={<DetailAccessoryPage />} />
        <Route path="/chi-tiet-don-hang" element={<OrderDetailsPage />} />
      </Route>

      <Route element={<EmptyLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/thiet-ke" element={<DesignPage />} />
        <Route path="/vnpay_return" element={<PaymentSuccessPage />} />
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
