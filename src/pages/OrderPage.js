import { Layout } from "antd";
import Order from "@/components/order/Order";
import "@/styles/Order.scss";
const { Content } = Layout;
function OrderPage() {
  return (
    <div className="order-page">
      <Layout>
        <Content>
          <Order />
        </Content>
      </Layout>
    </div>
  );
}

export default OrderPage;
