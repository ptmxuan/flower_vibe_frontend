import React, { useState, useEffect } from "react";
import { Table, Modal, Typography, Tag } from "antd";
import { useNhapHang } from "@/hooks/useNhapHang";
import "@/styles/ManageNhapHang.scss";
import CreateNhapHang from "./CreateNhapHang";
import { useCombineDataContext } from "@/store/CombinedDataContext";
import { useNhaCungCap } from "@/hooks/useNhaCungCap"; 
const { Title } = Typography;

function NhapHangBody() {
  const { nhapHangs, getNhapHangs } = useNhapHang();
  const {products} = useCombineDataContext();
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {nhaCungCaps,getNhaCungCaps}= useNhaCungCap()
  useEffect(() => {
    getNhapHangs();
    getNhaCungCaps() // Gọi API để lấy danh sách nhập hàng
  }, []);
  const findProductById = (productId, products) => {

    const productIdString = productId._id || productId;  
  
    return products.find((product) => String(product._id) === String(productIdString)) || null;
  };

  const findSupplierById = (supplierId, nhaCungCaps) => {
    return nhaCungCaps.find((supplier) => supplier._id === supplierId) || null;
  };
 
  const columns = [
    {
      title: "Nhà cung cấp",
      dataIndex: "supplierName",
      key: "supplierName",
      sorter: (a, b) => a.supplierName.localeCompare(b.supplierName),
      render: (supplierId) => {
        const matchedSupplier = findSupplierById(supplierId, nhaCungCaps);
        return matchedSupplier ? matchedSupplier.ten : "Không xác định";
      },
    },
    {
      title: "Sản phẩm",
      key: "products",
      render: (_, record) =>
        record.products.map((product, index) => {
          const matchedProduct = findProductById(product.productId, products);
          return matchedProduct ? (
            <Tag color="blue" key={index}>
              {matchedProduct.ten} x {product.quantity}
            </Tag>
          ) : (
            <Tag color="blue" key={index}>
              Sản phẩm không tìm thấy
            </Tag>
          );
        }),
    },
    {
      title: "Tổng số lượng",
      key: "totalQuantity",
      render: (_, record) =>
        record.products.reduce((sum, product) => sum + product.quantity, 0),
    },
    {
      title: "Tổng giá nhập",
      key: "totalPrice",
      render: (_, record) =>
        record.products.reduce((sum, product) => sum + product.importPrice * product.quantity, 0),
    },
    {
      title: "Ngày nhập",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (createdAt) => new Date(createdAt).toLocaleDateString("vi-VN"),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
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
          dataSource={nhapHangs}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 8 }}
        />
        <Modal
          title="Chi tiết hóa đơn nhập"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {selectedHoaDon && (
            <div>
              <p>
                <strong>Nhà cung cấp:</strong> {selectedHoaDon.supplierName}
              </p>
              <p>
                <strong>Ngày nhập:</strong>{" "}
                {new Date(selectedHoaDon.createdAt).toLocaleDateString("vi-VN")}
              </p>
              <p>
                <strong>Nội dung:</strong> {selectedHoaDon.description}
              </p>
              <Table
                columns={[
                  { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
                  { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
                  {
                    title: "Giá nhập",
                    dataIndex: "importPrice",
                    key: "importPrice",
                    render: (price) =>
                      price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }),
                  },
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
