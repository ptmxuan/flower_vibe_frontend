import { Col, Row } from "antd";
import UserHistoryOrder from "./UserHistoryOrder";
import TabProfile from "./userInfo/Tab";


function UserContent() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <div className="user-content-left">
          <TabProfile />
        </div>
      </Col>
      <Col span={16}>
        <div className="user-content-right">
          <UserHistoryOrder />
        </div>
      </Col>
    </Row>
  );
}

export default UserContent;
