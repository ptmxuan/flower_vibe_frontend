import { Col, Row } from "antd";
import UserInfor from "./UserInfor";
import UserHistoryOrder from "./UserHistoryOrder";
function UserContent() {
  return (
    <Row>
      <Col span={12}>
        <div className="user-content-left">
          <UserInfor />
        </div>
      </Col>
      <Col span={12}>
        <div className="user-content-right">
          <UserHistoryOrder />
        </div>
      </Col>
    </Row>
  );
}

export default UserContent;
