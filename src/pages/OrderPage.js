import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Layout } from "antd";
import Order from "@/components/order/Order";
import "@/styles/Order.scss";
const { Content } = Layout;
function OrderPage() {
  return (
    <div className="order-page">
      <Header />
      <Layout>
        <Content>
          <Order />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default OrderPage;
