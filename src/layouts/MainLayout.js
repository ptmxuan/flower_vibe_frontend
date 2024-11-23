import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "@/styles/Layout.scss";

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const MainLayout = () => {
  return (
    <Layout className="layout-container">
      <AntHeader className="header-container">
        <Header />
      </AntHeader>
      <Content className="main-content">
        <Outlet />
      </Content>
      <AntFooter className="footer-container">
        <Footer />
      </AntFooter>
    </Layout>
  );
};

export default MainLayout;
