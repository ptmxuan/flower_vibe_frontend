import User from "@/components/user/User";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "@/styles/User.scss";
import { Layout } from "antd";
const { Content } = Layout;
function UserPage() {
  return (
    <div className="user-page">
      <Header />
      <Layout>
        <Content>
          <User />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default UserPage;
