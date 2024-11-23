import User from "@/components/user/User";
import { Layout } from "antd";

import "@/styles/User.scss";

const { Content } = Layout;

function UserPage() {
  return (
    <div className="user-page">
      <Layout>
        <Content>
          <User />
        </Content>
      </Layout>
    </div>
  );
}

export default UserPage;
