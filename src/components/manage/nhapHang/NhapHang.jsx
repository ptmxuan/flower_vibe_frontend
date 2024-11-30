import React, { useState, useEffect } from "react";
import { Table, Modal, Typography } from "antd";
import { useNhapHang } from "@/hooks/useNhapHang";
import "@/styles/ManageNhapHang.scss";
import CreateNhapHang from "./CreateNhapHang";

const { Title } = Typography;

function NhapHangBody() {
  const { nhapHangs, getNhapHangs } = useNhapHang(); // Sửa hàm cho đúng với useNhapHang
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getNhapHangs(); // Gọi đúng hàm từ useNhapHang
  }, []);

  const columns = [
    {
      title: "Nhà cung cấp",
      dataIndex: "nhaCungCap",
      sorter: (a, b) => a.nhaCungCap.ten.localeCompare(b.nhaCungCap.ten),
      render: (ncc) => ncc?.ten || "Không xác định",
    },
    {
      title: "Ngày nhập",
      dataIndex: "ngayNhap",
      sorter: (a, b) => new Date(a.ngayNhap) - new Date(b.ngayNhap),
    },
    {
      title: "Nội dung",
      dataIndex: "noiDung",
    },
  ];

  const handleRowClick = (record) => {
    setSelectedHoaDon(record);
    setIsModalOpen(true);
  };

  return (
    <div className="wrapper">
      <div className="title-page">
        <Title level={1}>Quản lý nhập hàng</Title>
      </div>
      <div className="title-body">
        <div className="search-bar"></div>

        <div style={{ margin: "5px 0" }}>
          <CreateNhapHang handleRefresh={getNhapHangs} />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={nhapHangs} // Sửa thành nhapHangs từ useNhapHang
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 8 }}
        />
        <Modal
          title="Chi tiết hóa đơn nhập"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {selectedHoaDon && (
            <div>
              <p>Nhà cung cấp: {selectedHoaDon.nhaCungCap.ten}</p>
              <p>Ngày nhập: {selectedHoaDon.ngayNhap}</p>
              <p>Nội dung: {selectedHoaDon.noiDung}</p>
              <Table
                columns={[
                  { title: "Tên sản phẩm", dataIndex: "ten" },
                  { title: "Số lượng", dataIndex: "quantity" },
                  { title: "Giá nhập", dataIndex: "price" },
                ]}
                dataSource={selectedHoaDon.products}
                rowKey="_id"
                pagination={false}
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default NhapHangBody;
