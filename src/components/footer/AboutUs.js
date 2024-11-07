import Header from "@/components/header/Header";
import { Col, Row } from "antd";
function AboutUs() {
  return (
    <>
      <Header />
      <div className="about-us">
        <Row>
         
            <Col span={18} push={6}>
              col-18 col-push-6
            </Col>
       
            <Col span={6} pull={18}>
              col-6 col-pull-18
            </Col>
         
        </Row>
      </div>
    </>
  );
}

export default AboutUs;
