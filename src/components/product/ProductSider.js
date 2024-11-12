import {
  FormatPainterOutlined,
  HeartOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "1",
    icon: <HeartOutlined />,
    label: "Chủ đề",
    children: [
      { key: "Hoa sinh nhật", label: "Hoa sinh nhật" },
      { key: "Hoa khai trương", label: "Hoa khai trương" },
      { key: "Hoa tốt nghiệp", label: "Hoa tốt nghiệp" },
      { key: "Hoa cưới", label: "Hoa cưới" },
    ],
  },
  {
    key: "2",
    icon: <FormatPainterOutlined />,
    label: "Màu sắc",
    children: [
      { key: "Màu vàng", label: "Màu vàng" },
      { key: "Màu đỏ", label: "Màu đỏ" },
      { key: "Màu hồng", label: "Màu hồng" },
      { key: "Màu tím", label: "Màu tím" },
      { key: "Màu xanh", label: "Màu xanh" },
      { key: "Màu trắng", label: "Màu trắng" },
      { key: "Mix màu", label: "Mix màu" },
    ],
  },
  {
    key: "3",
    icon: <FilterOutlined />,
    label: "Phân khúc giá",
    children: [
      { key: "duoi-200", label: "Dưới 200.000 VND" },
      { key: "200-500", label: "200.000 VND đến 500.000 VND" },
      { key: "500-700", label: "500.000 VND đến 700.000 VND" },
      { key: "700-1000", label: "700.000 VND đến 1.000.000 VND" },
      { key: "tren-1000", label: "Trên 1.000.000 VND" },
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 0) => {
    items2.forEach((item) => {
      key[item.key] = level; // Gán level cho từng item
      if (item.children) {
        func(item.children, level + 1); // Gọi đệ quy cho children
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

function ProductSider({ stateOpenKeys, setStateOpenKeys, setSelectSider }) {
  const navigate = useNavigate();
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const onSelect = (info) => {
    console.log("Selected key:", info.key); // In ra key đã chọn
    setSelectSider(info.key);

    // Điều hướng đến trang sản phẩm với query parameter đã chọn
    const queryParamKey = info.key; // key của màu sắc hoặc chủ đề
    let navigatePath = "/san-pham?";

    // Kiểm tra cấp độ của key đã chọn
    const levelKey = levelKeys[info.key];
    console.log("info.key", info.key);
    if (levelKey === 1) {
      // Chủ đề
      navigatePath += `chude=${encodeURIComponent(info.key)}`;
    } else if (levelKey === 2) {
      // Màu sắc
      navigatePath += `mau=${encodeURIComponent(info.key)}`;
    }

    navigate(navigatePath); // Điều hướng tới URL mới
  };

  return (
    <div className="product-sider">
      <Menu
        mode="inline"
        defaultSelectedKeys={["123"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect} // Thêm sự kiện onSelect ở đây
        style={{
          width: 256,
        }}
        items={items}
      />
    </div>
  );
}

export default ProductSider;
