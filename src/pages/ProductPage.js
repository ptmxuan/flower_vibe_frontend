import { useState } from "react";
import { Layout } from "antd";
import Product from "@/components/product/Product";
import ProductSider from "@/components/product/ProductSider";

import "@/styles/Product.scss";

const { Sider, Content } = Layout;

function ProductPage() {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const [selectSider, setSelectSider] = useState("");
  return (
    <div className="product-page">
      <Layout>
        <Sider>
          <ProductSider
            stateOpenKeys={stateOpenKeys}
            setStateOpenKeys={setStateOpenKeys}
            selectSider={selectSider}
            setSelectSider={setSelectSider}
          />
        </Sider>
        <Content>
          <Product selectSider={selectSider} />
        </Content>
      </Layout>
    </div>
  );
}

export default ProductPage;
