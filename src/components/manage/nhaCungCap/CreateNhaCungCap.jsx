import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useNhaCungCap } from "@/hooks/useNhaCungCap"; // Hook for Nhà Cung Cấp API

function CreateNhaCungCap({ handleGet }) {
  const { createNhaCungCap, error, data } = useNhaCungCap(); // Hook API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const newSupplier = await form.validateFields();

      // Chuẩn bị payload
      const payload = {
        ...newSupplier,
      };

      // Gửi yêu cầu tạo nhà cung cấp
      await createNhaCungCap(payload);
      handleGet(); // Refresh the list of Nhà Cung Cấp
      message.success("Tạo nhà cung cấp thành công!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      console.error("Error creating Nhà Cung Cấp:", e);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : `Tạo nhà cung cấp thất bại!`
      );
    }
  }, [data, error]);

  return (
    <div className="create-supplier-wrapper">
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="create-supplier-button"
      >
        Tạo nhà cung cấp mới
      </Button>

      <Modal
        title="Tạo nhà cung cấp mới"
        width="40vw"
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={handleCreate}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ten"
            label="Tên nhà cung cấp"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="diaChi"
            label="Địa chỉ nhà cung cấp"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ nhà cung cấp" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateNhaCungCap;
