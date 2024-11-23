import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { useChangePassword } from "@/hooks/useChangePassword";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { changePassword, isSubmitting } = useChangePassword();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleSubmit = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      return message.error(
        "Mật khẩu mới và xác nhận mật khẩu không trùng khớp."
      );
    }

    try {
      setIsSubmittingForm(true);

      const userId = JSON.parse(localStorage.getItem("user"))._id;

      const {
        success,
        message: responseMessage,
        error,
      } = await changePassword(userId, currentPassword, newPassword);

      if (success) {
        message.success(
          responseMessage || "Mật khẩu đã được thay đổi thành công."
        );
        form.resetFields();
      } else {
        message.error(error || "Đổi mật khẩu thất bại");
      }
    } catch (err) {
      console.error("Error during change password:", err);
      message.error("Đã xảy ra lỗi khi thay đổi mật khẩu.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="change-password">
      <Form
        form={form}
        name="changePassword"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
      >
        <div className="box">
          <p className="title">Mật khẩu hiện tại:</p>
          <Form.Item
            required
            name="currentPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="box">
          <p className="title">Mật khẩu mới:</p>
          <Form.Item
            required
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 5, message: "Phải có ít nhất 5 ký tự!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="box">
          <p className="title">Xác nhận mật khẩu mới:</p>
          <Form.Item
            required
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmittingForm || isSubmitting}
            disabled={isSubmittingForm || isSubmitting}
          >
            Thay Đổi Mật Khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
