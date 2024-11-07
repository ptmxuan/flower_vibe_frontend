import accessoryData from "@/constants/AccessoryData";
import AccessoryItem from "@/components/accessories/AccessoryItem";
import { Row, Col } from "antd";
function Accessories() {
  return (
    <div className="accessory">
      <div className="accessory-title">
        <h1>PHỤ KIỆN</h1>
      </div>
      <div className="accessory-list">
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
          {accessoryData.map((access) => (
            <Col key={access.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <AccessoryItem access={access} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Accessories;
