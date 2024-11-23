import Cart from "@/components/cart/Cart";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Layout } from "antd";
import { useUserContext, useCombineDataContext } from "@/store";
import "@/styles/Cart.scss";
const { Content } = Layout;

function CartPage() {
  const userInfo = useUserContext();
  const userId = userInfo?._id;

  const { products } = useCombineDataContext();
  return (
    <div className="cart-page">
      <Layout>
        <Content>
          <Cart products={products} userId={userId} />
        </Content>
      </Layout>
    </div>
  );
}

export default CartPage;
