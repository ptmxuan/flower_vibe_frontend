import Product from "@/components/product/Product";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductSider from "@/components/product/ProductSider";
import "@/styles/Product.scss";
import { Layout } from "antd";
import { useState } from "react";
const { Sider, Content } = Layout;
function ProductPage() {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const [selectSider, setSelectSider] = useState("");
  return (
    <div className="product-page">
      <Header />
      <Layout>
        <Sider width="25%">
          <ProductSider
            stateOpenKeys={stateOpenKeys}
            setStateOpenKeys={setStateOpenKeys}
            selectSider={selectSider}
            setSelectSider={setSelectSider}
          />
        </Sider>
        <Content>
          <Product
            selectSider={selectSider}
            
          />
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}

export default ProductPage;
