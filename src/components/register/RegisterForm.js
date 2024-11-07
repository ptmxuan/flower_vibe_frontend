import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useRegister } from "@/hooks"; // Thay đường dẫn phù hợp

const { Option } = Select;

function RegisterForm() {
  const [form] = Form.useForm();
  const { register, loading, error, success } = useRegister();

  const onFinish = async (values) => {
    const userData = {
      name: values.name,
      phone: values.phone,
      gender: values.gender,
      username: values.username,
      password: values.password,
    };
    await register(userData);
    if (success) {
      console.log("success", success);
      message.success("Đăng ký thành công!");
      form.resetFields();
    }
  };

  // Hiển thị thông báo khi đăng ký thành công hoặc thất bại

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 24, offset: 0 },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="register-form">
      <div className="title-register-right">
        <h1>Đăng ký</h1>
      </div>
      <div className="form-content-register">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: "86" }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          {/* Họ và tên */}
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>

          {/* Số điện thoại */}
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          {/* Giới tính */}
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính của bạn">
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>

          {/* Username */}
          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không hợp lệ!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Nút Đăng ký */}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterForm;
