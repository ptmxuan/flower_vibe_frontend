import Cart from "@/components/cart/Cart";
import "@/styles/Cart.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useUserContext, useCombineDataContext } from "@/store";
import { Layout } from "antd";
const { Content } = Layout;
function CartPage() {
  const userInfor = useUserContext();
  const userId = userInfor?._id;
  const { products } = useCombineDataContext();
  return (
    <div className="cart-page">
      <Header />
      <Layout>
        <Content>
          <Cart products={products} userId={userId} />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default CartPage;
