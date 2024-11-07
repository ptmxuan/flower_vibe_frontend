import { Col, Row } from "antd";
import RegisterForm from "./RegisterForm";
import WOW from "wowjs";
import "animate.css";
import { useEffect } from "react";

function Register() {
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);
  return (
    <div className="register">
      <Row>
        <Col span={14}>
          <div
            className="register-left wow fadeInRight"
            data-wow-duration="1.5s"
            data-wow-delay="0.5s"
          >
            <div className="title-register-left">
              <h1>"Mang sắc màu của riêng bạn vào cuộc sống"</h1>
            </div>
            <div className="content-register-left">
              <p>
                Đăng ký ngay để khám phá thế giới hoa độc đáo của chúng tôi!
              </p>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div
            className="register-right wow fadeInLeft"
            data-wow-duration="1.5s"
            data-wow-delay="0.5s"
          >
            <RegisterForm />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
