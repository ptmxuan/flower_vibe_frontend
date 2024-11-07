import Cart from "@/components/cart/Cart";
import "@/styles/Cart.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Layout } from "antd";
const { Content } = Layout;
function CartPage() {
  return (
    <div className="cart-page">
      <Header />
      <Layout>
        <Content>
          <Cart />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default CartPage;
