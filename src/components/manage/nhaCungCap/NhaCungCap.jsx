import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Table,
  Popconfirm,
  Modal,
  Form,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "@/styles/ManageNhaCungCapPage.scss";
import { useNhaCungCap } from "@/hooks/useNhaCungCap";

const { Title, Text } = Typography;

function NhaCungCapBody() {
  const {
    nhaCungCaps: nhaCungCapListOfAPI,
    createNhaCungCap,
    updateNhaCungCapById,
    getNhaCungCaps,
    deleteNhaCungCapById,
  } = useNhaCungCap();

  useEffect(() => {
    getNhaCungCaps();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNhaCungCap, setEditingNhaCungCap] = useState(null);
  const [nhaCungCaps, setNhaCungCaps] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (nhaCungCapListOfAPI) {
      const filteredNhaCungCaps = searchKeyword
        ? nhaCungCapListOfAPI?.filter((nhaCungCap) =>
            nhaCungCap.ten.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : nhaCungCapListOfAPI;
      setNhaCungCaps(filteredNhaCungCaps);
    }
  }, [nhaCungCapListOfAPI, searchKeyword]);

  const deleteNhaCungCap = async (id) => {
    setNhaCungCaps((prevNhaCungCaps) =>
      prevNhaCungCaps.filter((item) => item._id !== id)
    );
    await deleteNhaCungCapById(id);
    await getNhaCungCaps();
  };

  const handleEdit = (nhaCungCap) => {
    setEditingNhaCungCap(nhaCungCap);
    setIsModalOpen(true);
    form.setFieldsValue({
      ten: nhaCungCap.ten,
      diaChi: nhaCungCap.diaChi,
    });
  };

  const handleUpdate = async () => {
    try {
      const nhaCungCapData = await form.validateFields();

      if (editingNhaCungCap) {
        // Update logic
        await updateNhaCungCapById(editingNhaCungCap?._id, nhaCungCapData);
        message.success("Cập nhật nhà cung cấp thành công!");
      } else {
        // Create logic
        await createNhaCungCap(nhaCungCapData);
        message.success("Thêm nhà cung cấp mới thành công!");
      }

      await getNhaCungCaps();
      setIsModalOpen(false);
      setEditingNhaCungCap(null);
    } catch (error) {
      console.error("Operation failed", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const columns = [
    {
      title: "Tên nhà cung cấp",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
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
            title="Bạn có chắc chắn muốn xóa nhà cung cấp này không?"
            onConfirm={() => deleteNhaCungCap(record._id)}
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
        <Title level={1}>Quản lý nhà cung cấp</Title>
      </div>
      <div className="title-body">
        <div className="search-bar">
          <Input
            placeholder="Tìm kiếm nhà cung cấp..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            form.resetFields();
            setEditingNhaCungCap(null);
          }}
        >
          Thêm nhà cung cấp
        </Button>
      </div>

      <div className="length-list">
        <Text>{nhaCungCaps.length} nhà cung cấp</Text>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(nhaCungCaps) ? nhaCungCaps : []}
        rowKey="_id"
        pagination={{ pageSize: 8 }}
        className="manager-nhaCungCaps-table"
      />

      {/* Modal for Adding/Editing NhaCungCap */}
      <Modal
        title={
          editingNhaCungCap ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"
        }
        width="50vw"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
        okText="Lưu"
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
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default NhaCungCapBody;
