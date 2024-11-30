import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Table,
  Popconfirm,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "@/styles/ManageChuDePage.scss";
import { useChuDe } from "@/hooks/useChuDe";
import CreateChuDe from "./CreateChuDe";
import { useProduct } from "@/hooks/useProduct";

const { Title, Text } = Typography;
const { Option } = Select;

function ChuDeBody() {
  const {
    chuDes: chuDeListOfAPI,
    updateChuDeById,
    getChuDes,
    deleteChuDeById,
  } = useChuDe();

  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChuDe, setEditingChuDe] = useState(null);
  const [chuDes, setChuDes] = useState([]);
  const [form] = Form.useForm();

  // Đồng bộ danh sách chủ đề từ API và áp dụng bộ lọc tìm kiếm
  useEffect(() => {
    if (chuDeListOfAPI) {
      const filteredChuDes = searchKeyword
        ? chuDeListOfAPI?.filter((chuDe) =>
            chuDe.ten.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : chuDeListOfAPI;
      setChuDes(filteredChuDes);
    }
  }, [chuDeListOfAPI, searchKeyword]);

  const deleteChuDe = async (id) => {
    setChuDes((prevChuDes) => prevChuDes.filter((item) => item._id !== id));
    await deleteChuDeById(id);
    await getChuDes();
  };

  const handleEdit = (chuDe) => {
    setEditingChuDe(chuDe);
    setIsModalOpen(true);
    form.setFieldsValue({
      ten: chuDe.ten,
      moTa: chuDe.moTa,
      sanPhams: chuDe.sanPhams.map((sp) => sp.id), // Gán danh sách id sản phẩm
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedChuDe = await form.validateFields();
      const payload = {
        ...updatedChuDe,
        sanPhams: updatedChuDe.sanPhams, // Lấy danh sách id sản phẩm đã chọn
      };

      await updateChuDeById(editingChuDe?.id, payload);
      await getChuDes();
      setIsModalOpen(false);
      setEditingChuDe(null);
      message.success("Cập nhật chủ đề thành công!");
    } catch (error) {
      console.error("Update failed", error);
      message.error("Cập nhật chủ đề thất bại!");
    }
  };

  const columns = [
    {
      title: "Tên chủ đề",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Sản phẩm thuộc chủ đề",
      dataIndex: "sanPhams",
      key: "sanPhams",
      render: (sanPhams) => (
        <div>
          {sanPhams && sanPhams.length > 0
            ? sanPhams.map((sp) => (
                <span key={sp.id} style={{ marginRight: 8 }}>
                  {sp.ten}
                </span>
              ))
            : "Chưa có sản phẩm"}
        </div>
      ),
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
            title="Bạn có chắc chắn muốn xóa chủ đề này không?"
            onConfirm={() => deleteChuDe(record.id)}
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
        <Title level={1}>Quản lý chủ đề</Title>
      </div>
      <div className="title-body">
        <div className="search-bar">
          <Input
            placeholder="Tìm kiếm chủ đề..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <CreateChuDe handleGet={getChuDes} />
      </div>

      <div className="length-list">
        <Text>{chuDes.length} chủ đề</Text>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(chuDes) ? chuDes : []}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        className="manager-chuDes-table"
      />

      {/* Modal for Editing ChuDe */}
      <Modal
        title="Chỉnh sửa chủ đề"
        width="50vw"
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={handleUpdate}
        okText="Lưu"
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
              {products?.map((product) => (
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

export default ChuDeBody;
