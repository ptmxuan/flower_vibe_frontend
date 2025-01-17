import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  Table,
  InputNumber
} from "antd";
import { useProduct } from "@/hooks/useProduct";
import { useNhaCungCap } from "@/hooks/useNhaCungCap";
import { useNhapHang } from "@/hooks/useNhapHang";

const { Option } = Select;

function CreateNhapHang({ handleRefresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts,updateQuantity } = useProduct();
  const { nhaCungCaps, getNhaCungCaps } = useNhaCungCap();
  const { createNhapHang } = useNhapHang();

  useEffect(() => {
    getProducts();
    getNhaCungCaps();
  }, []);

  const handleAddRow = () => {
    setProductsData([
      ...productsData,
      { key: Date.now(), productId: null, quantity: 0, importPrice: 0 },
    ]);
  };

  const handleDeleteRow = (key) => {
    setProductsData(productsData.filter((row) => row.key !== key));
  };

  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      const payload = {
        ...formValues,
        products: productsData.map(({ productId, quantity, importPrice }) => ({
          productId,
          quantity,
          importPrice,
        })),
      };
console.log("payload",payload)
      await createNhapHang(payload);
      for (const { productId, quantity } of productsData) {
        if (quantity > 0) {  
          await updateQuantity(productId, quantity);
        }
      }
      message.success("Tạo hóa đơn nhập hàng thành công!");
      handleRefresh();
      setIsModalOpen(false);
      form.resetFields();
      setProductsData([]);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi tạo hóa đơn nhập hàng!");
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      render: (_, record, index) => (
        <Select
          value={record.productId}
          onChange={(value) => {
            const updated = [...productsData];
            updated[index].productId = value;
            setProductsData(updated);
          }}
          style={{ width: "100%" }}
          placeholder="Chọn sản phẩm"
        >
          {products.map((product) => (
            <Option key={product._id} value={product._id}>
              {product.ten}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (_, record, index) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) => {
            const updated = [...productsData];
            updated[index].quantity = Number(e.target.value);
            setProductsData(updated);
          }}
          placeholder="Nhập số lượng"
        />
      ),
    },
    {
      title: "Giá nhập",
      dataIndex: "importPrice",
      render: (_, record, index) => (
        <Input
        min={1}
          type="number"
          value={record.importPrice}
          onChange={(e) => {
            const updated = [...productsData];
            updated[index].importPrice = Number(e.target.value);
            setProductsData(updated);
          }}
          placeholder="Nhập giá nhập"
        />
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteRow(record.key)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Tạo đơn nhập hàng mới
      </Button>

      <Modal
        title="Tạo hóa đơn nhập hàng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        width="70%"
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="supplierName"
            label="Nhà cung cấp"
            rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp" }]}
          >
            <Select placeholder="Chọn nhà cung cấp">
              {nhaCungCaps.map((ncc) => (
                <Option key={ncc._id} value={ncc._id}>
                  {ncc.ten}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="Ngày nhập"
            rules={[{ required: true, message: "Vui lòng chọn ngày nhập" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Nội dung nhập hàng"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={productsData}
          pagination={false}
          footer={() => (
            <Button type="dashed" block onClick={handleAddRow}>
              Thêm sản phẩm
            </Button>
          )}
        />
      </Modal>
    </div>
  );
}

export default CreateNhapHang;
