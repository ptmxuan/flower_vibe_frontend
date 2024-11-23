import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { useProfile } from "@/hooks/useProfile"; 

function UserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { updateProfile, loading } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [initialData, setInitialData] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setInitialData({
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      username: user.username,
    });
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      username: user.username,
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = form.getFieldsValue();
      const result = await updateProfile(user._id, updatedData);
      if (result === 'success') {
        message.success("Cập nhật thông tin thành công");
        setIsEditing(false);
      } else {
        message.error(result || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      message.error("Cập nhật thất bại");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(initialData); // Khôi phục lại dữ liệu ban đầu
  };

  return (
    <Form form={form} className="user-info" layout="vertical">
      <div className="account-name">
        <p className="title">Username:</p>
        {isEditing ? (
          <Form.Item name="username" noStyle className="input">
            <Input disabled={!isEditing} />
          </Form.Item>
        ) : (
          <p className="content">{user.username}</p>
        )}
      </div>

      <div className="user-name">
        <p className="title">Họ và tên:</p>
        {isEditing ? (
          <Form.Item name="name" noStyle>
            <Input disabled={!isEditing} />
          </Form.Item>
        ) : (
          <p className="content">{user.name}</p>
        )}
      </div>

      <div className="user-phone">
        <p className="title">Số điện thoại:</p>
        {isEditing ? (
          <Form.Item name="phone" noStyle className="content">
            <Input disabled={!isEditing} />
          </Form.Item>
        ) : (
          <p className="content">{user.phone}</p>
        )}
      </div>

      <div className="user-male">
        <p className="title">Giới tính:</p>
        {isEditing ? (
          <Form.Item name="gender" noStyle>
            <Input disabled={!isEditing} />
          </Form.Item>
        ) : (
          <p className="content">
            {user.gender === "female" ? "Nữ" : user.gender === "other" ? "Khác" : "Nam"}
          </p>
        )}
      </div>

      <div className="user-actions">
        {isEditing ? (
          <>
            <Button
              type="primary"
              loading={loading}
              onClick={handleSave}
            >
              Lưu
            </Button>
            <Button
              type="default"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button type="default" onClick={handleEdit}>
            Thay đổi
          </Button>
        )}
      </div>
    </Form>
  );
}

export default UserInfo;
