import { Col, Row } from "antd";
import UserInfor from "./UserInfor";
import UserHistoryOrder from "./UserHistoryOrder";
function UserContent() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <div className="user-content-left">
          <UserInfor />
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
