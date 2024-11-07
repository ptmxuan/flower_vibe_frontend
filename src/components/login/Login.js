import { Col, Row } from "antd";
import LoginForm from "./LoginForm";
import WOW from "wowjs";
import "animate.css";
import { useEffect } from "react";
function Login() {
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);
  return (
    <div className="login">
      <Row>
        <Col span={12}>
          <div
            className="login-left wow fadeInRight"
            data-wow-duration="1.5s"
            data-wow-delay="0.5s"
          >
            <div className="title-login-left">
              <h1>"Chào mừng bạn trở lại"</h1>
            </div>
            <div className="content-login-left">
              <p>Đăng nhập ngay để tiếp tục hành trình sáng tạo của bạn!</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div
            className="login-right wow fadeInLeft"
            data-wow-duration="1.5s"
            data-wow-delay="0.5s"
          >
            <LoginForm />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
