import React from "react";
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks"; // Điều chỉnh đường dẫn nếu cần

function LoginForm() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin(); // Sử dụng hook useLogin

  const onFinish = async (values) => {
    try {
      console.log("values.username", values.username);
      console.log("values.password", values.password);
      await login(values.username, values.password);

      navigate("/");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("user", storedUser);
      notification.success({
        message: "Đăng nhập thành công",
        description: `Chúc bạn ${storedUser.name} có trải nghiệm tại web`,
        placement: "bottomRight",
      });
    } catch (err) {
      console.error("Login failed:", err.message); // Xử lý lỗi nếu có
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <div className="title-login-right">
        <h1>Đăng nhập</h1>
      </div>
      <div className="form-content">
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lưu tài khoản</Checkbox>
              </Form.Item>
              <a href="">Quên mật khẩu</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
            <a href="/dang-ky">Đăng ký</a>
          </Form.Item>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
