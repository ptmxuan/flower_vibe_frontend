import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProduct } from "@/hooks/useProduct";

const { Option } = Select;

function CreateProductPage({ getProducts }) {
  const { createProduct } = useProduct(); // Hook API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null); // Ảnh được chọn từ file upload

  // Chuyển đổi file sang Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleCreate = async () => {
    try {
      const newProduct = await form.validateFields();
      let imageBase64 = null;

      // Nếu người dùng chọn ảnh
      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
      }

      // Chuẩn bị payload
      const payload = {
        ...newProduct,
        hinh: imageBase64, // Base64 hoặc null nếu chưa chọn ảnh
      };

      // Gửi yêu cầu tạo sản phẩm
      await createProduct(payload);
      await getProducts();
      message.success("Tạo sản phẩm thành công!");
      setIsModalOpen(false);
      form.resetFields();
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create product:", error);
      message.error("Tạo sản phẩm thất bại!");
    }
  };

  return (
    <div className="create-product-wrapper">
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="create-product-button"
      >
        Tạo sản phẩm mới
      </Button>

      <Modal
        title="Tạo sản phẩm mới"
        width="50vw"
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setImageFile(null);
        }}
        onOk={handleCreate}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ten"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <Upload
              beforeUpload={(file) => {
                setImageFile(file); // Lưu file ảnh
                return false; // Không tự động upload
              }}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {imageFile && (
              // Hiển thị preview ảnh
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ width: 100, marginTop: 10 }}
              />
            )}
          </Form.Item>

          <Form.Item
            name="gia"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="mau"
            label="Màu"
            rules={[{ required: true, message: "Vui lòng chọn màu hoa" }]}
          >
            <Select>
              <Option value="Mix màu">Mix màu</Option>
              <Option value="Màu vàng">Màu vàng</Option>
              <Option value="Màu đỏ">Màu đỏ</Option>
              <Option value="Màu hồng">Màu hồng</Option>
              <Option value="Màu tím">Màu tím</Option>
              <Option value="Màu xanh">Màu xanh</Option>
              <Option value="Màu trắng">Màu trắng</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="hinhdang"
            label="Hình dạng"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select placeholder="Chọn loại sản phẩm">
              <Option value="Bó hoa">Bó hoa</Option>
              <Option value="Lẳng hoa">Lẳng hoa</Option>
              <Option value="Vòng hoa">Vòng hoa</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="detailDescription" label="Mô tả chi tiết">
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateProductPage;
