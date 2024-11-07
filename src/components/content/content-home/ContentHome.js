import background from "@/assets/img/background_home.png";
import { Card, Col, Row } from "antd";
import Sale from "@/components/sale/Sale";
import TopProduct from "@/components/top-product/TopProduct";
import SliderBanner from "@/components/slider/SliderBanner";
import {
  HighlightOutlined,
  GiftOutlined,
  BellOutlined,
} from "@ant-design/icons";

function ContentHome() {
  return (
    <div className="content-home">
      <div className="background">
        <div className="background-img">
          <SliderBanner />
        </div>
        <h2 className="slogan">YOUR DESIGN - YOUR VIBE FOR YOUR LOVE</h2>
      </div>
      <div className="banner-area">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title={
                <div className="banner-icon-flower">
                  <BellOutlined />
                  <span>Hoa tươi</span>
                </div>
              }
              bordered={false}
            >
              Đảm bảo hoa luôn tươi và được cập nhật liên tục
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <div className="baner-icon-design">
                  <HighlightOutlined />
                  <span>Thiết kế</span>
                </div>
              }
              bordered={false}
            >
              Thỏa sức sáng tạo sản phẩm hoa gửi đến những người thân yêu
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <div className="banner-icon-sale">
                  <GiftOutlined />
                  <span>Khuyến mãi</span>
                </div>
              }
              bordered={false}
            >
              Luôn có sản phẩm khuyến mãi mỗi ngày
            </Card>
          </Col>
        </Row>
      </div>
      <div className="sale-area">
        <Sale />
      </div>
      <div className="top-product-area">
        <TopProduct />
      </div>
    </div>
  );
}

export default ContentHome;
