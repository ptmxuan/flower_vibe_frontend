import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { useProduct } from "@/hooks/useProduct";
import { useChuDe } from "@/hooks/useChuDe";

const { Option } = Select;

function CreateChuDe({ handleGet }) {
  // Destructure props correctly
  const { createChuDe, error, data } = useChuDe(); // Hook API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { products, getProducts } = useProduct(); // Lấy danh sách sản phẩm từ API

  useEffect(() => {
    getProducts(); // Lấy dữ liệu sản phẩm khi component được mount
  }, []);

  const handleCreate = async () => {
    try {
      const newTopic = await form.validateFields();

      // Chuẩn bị payload
      const payload = {
        ...newTopic,
      };

      // Gửi yêu cầu tạo chủ đề
      await createChuDe(payload);
      handleGet(); // This should work now
      message.success("Tạo chủ đề thành công!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : `Tạo chủ đề thất bại!`
      );
    }
  }, [data, error]);

  return (
    <div className="create-topic-wrapper">
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="create-topic-button"
      >
        Tạo chủ đề mới
      </Button>

      <Modal
        title="Tạo chủ đề mới"
        width="50vw"
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
            label="Tên chủ đề"
            rules={[{ required: true, message: "Vui lòng nhập tên chủ đề" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="sanPhams" label="Sản phẩm thuộc chủ đề">
            <Select
              mode="multiple"
              placeholder="Chọn sản phẩm"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {products.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.ten}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateChuDe;
