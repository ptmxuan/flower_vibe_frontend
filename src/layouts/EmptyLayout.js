import "@/styles/Layout.scss";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const EmptyLayout = () => {
  return (
    <div className="empty-layout-container">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default EmptyLayout;
