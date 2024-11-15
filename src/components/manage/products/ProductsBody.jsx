import { useState, useEffect } from "react";
import { Button, Select, Typography, Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import productData from "@/constants/ProductData"; // Adjust the import path if needed
import { Link } from "react-router-dom";
import "@/styles/ManageProductPage.scss";

const { Title, Text } = Typography;
const { Option } = Select;

function ProductsBody() {
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState(productData);

  // Filter products based on selected filter
  useEffect(() => {
    setProducts(
      filter
        ? productData.filter((product) => product.hinhdang === filter)
        : productData
    );
  }, [filter]);

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "hinh",
      key: "hinh",
      render: (text) => <img src={text} alt="product" style={{ width: 50, height: 50 }} />,
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
          <Link to={`/admin/editProduct/${record.id}`}>
            <EditOutlined style={{ marginRight: 16 }} />
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => deleteProduct(record.id)}
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
      <div className="length-list">
        <Text>{products.length} sản phẩm</Text>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        className="manager-products-table"
      />
    </div>
  );
}

export default ProductsBody;
