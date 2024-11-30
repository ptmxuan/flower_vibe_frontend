import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Typography,
  Table,
  Popconfirm,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "@/styles/ManageProductPage.scss";
import { useProduct } from "@/hooks/useProduct";
import CreateProductPage from "./CreateProduct";

const { Title, Text } = Typography;
const { Option } = Select;

function ProductsBody() {
  const {
    products: productsOfAPI,
    updateProductById,
    getProducts,
    deleteProductById,
  } = useProduct();
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null); // Store uploaded image file

  // Đồng bộ dữ liệu sản phẩm từ API
  useEffect(() => {
    const filteredProducts = filter
      ? productsOfAPI.filter((product) => product.hinhdang === filter)
      : productsOfAPI;
    setProducts(filteredProducts);
  }, [productsOfAPI, filter]);

  const deleteProduct = async (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item._id !== id)
    );
    await deleteProductById(id);
    await getProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setImageFile(null); // Reset file ảnh
    setIsModalOpen(true);
    form.setFieldsValue(product);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleUpdate = async () => {
    try {
      const updatedProduct = await form.validateFields();
      let imageBase64 = editingProduct.hinh; // URL hiện tại hoặc base64

      // Nếu người dùng chọn ảnh mới
      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile); // Chuyển file sang base64
      }

      // Chuẩn bị payload
      const payload = {
        ...updatedProduct,
        hinh: imageBase64, // Base64 của ảnh mới hoặc ảnh cũ
      };

      // Gửi dữ liệu cập nhật
      await updateProductById(editingProduct?._id, payload);
      await getProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
      message.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Update failed", error);
      message.error("Cập nhật sản phẩm thất bại!");
    }
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    return false;
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "hinh",
      key: "hinh",
      render: (text) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Đã bán",
      dataIndex: "luotmua",
      key: "luotmua",
    },
    {
      title: "Còn lại",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Loại",
      dataIndex: "hinhdang",
      key: "hinhdang",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 16, cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => deleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="wrapper">
      <div className="title-page">
        <Title level={1}>Quản lý sản phẩm</Title>
      </div>
      <div className="title-body">
        <div className="select-type">
          <Title level={5}>Loại sản phẩm</Title>
          <Select
            placeholder="Chọn hình dạng sản phẩm"
            style={{ width: 200 }}
            onChange={(value) => setFilter(value)}
            value={filter || undefined}
          >
            <Option value="">Tất cả</Option>
            <Option value="Bó hoa">Bó hoa</Option>
            <Option value="Lẳng hoa">Lẳng hoa</Option>
            <Option value="Vòng hoa">Vòng hoa</Option>
          </Select>
          <Button onClick={() => setFilter("")} style={{ marginLeft: "8px" }}>
            Đặt lại
          </Button>
        </div>
        <div className="create">
          <CreateProductPage getProducts={getProducts} />
        </div>
      </div>

      <div className="length-list">
        <Text>{products.length} sản phẩm</Text>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(products) ? products : []}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        className="manager-products-table"
      />

      {/* Modal for Editing Product */}
      <Modal
        title="Chỉnh sửa sản phẩm"
        width="50vw"
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setImageFile(null);
        }}
        onOk={handleUpdate}
        okText="Lưu"
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
            {imageFile ? (
              // Hiển thị ảnh base64
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ width: 100, marginTop: 10 }}
              />
            ) : (
              // Hiển thị ảnh hiện tại từ URL
              <img
                src={editingProduct?.hinh}
                alt="Current product"
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
            name="hinhdang"
            label="Hình dạng"
            rules={[{ required: true, message: "Vui lòng chọn loại" }]}
          >
            <Select>
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

export default ProductsBody;
