import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  FormatPainterOutlined,
  HeartOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useChuDe } from "@/hooks/useChuDe";

function ProductSider({ stateOpenKeys, setStateOpenKeys }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { chuDes } = useChuDe(); // Dữ liệu chủ đề
  const [menuItems, setMenuItems] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    chude: [],
    mausac: [],
    gia: [],
    hinhdang: [],
  });

  // Xử lý menu items từ chuDes
  useEffect(() => {
    const chuDeChildren = chuDes.map((chuDe) => ({
      key: chuDe.ten,
      label: chuDe.ten,
    }));

    const dynamicItems = [
      {
        key: "1",
        icon: <HeartOutlined />,
        label: "Chủ đề",
        title: "chude",
        children: chuDeChildren,
      },
      {
        key: "2",
        icon: <FormatPainterOutlined />,
        label: "Màu sắc",
        title: "mausac",
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
        title: "gia",
        children: [
          { key: "duoi-200", label: "Dưới 200.000 VND" },
          { key: "200-500", label: "200.000 VND đến 500.000 VND" },
          { key: "500-700", label: "500.000 VND đến 700.000 VND" },
          { key: "700-1000", label: "700.000 VND đến 1.000.000 VND" },
          { key: "tren-1000", label: "Trên 1.000.000 VND" },
        ],
      },
      {
        key: "4",
        icon: <FormatPainterOutlined />,
        label: "Hình dáng",
        title: "hinhdang",
        children: [
          { key: "Lẳng hoa", label: "Lẳng hoa" },
          { key: "Bó hoa", label: "Bó hoa" },
          { key: "Vòng hoa", label: "Vòng hoa" },
        ],
      },
    ];

    setMenuItems(dynamicItems);
  }, [chuDes]);

  // useEffect đọc từ query params và cập nhật các filter đã chọn
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const filters = {
      chude: [],
      mausac: [],
      gia: [],
      hinhdang: [],
    };

    searchParams.forEach((value, key) => {
      const decodedValue = decodeURIComponent(value);
      const values = decodedValue.split("&&");

      if (key === "chude") {
        filters.chude = values;
      } else if (key === "mausac") {
        filters.mausac = values;
      } else if (key === "gia") {
        filters.gia = values;
      } else if (key === "hinhdang") {
        filters.hinhdang = values;
      }
    });

    setSelectedFilters(filters);

    const openKeys = [];
    if (filters.chude.length > 0) openKeys.push("1");
    if (filters.mausac.length > 0) openKeys.push("2");
    if (filters.gia.length > 0) openKeys.push("3");
    if (filters.hinhdang.length > 0) openKeys.push("4");

    setStateOpenKeys(openKeys);
  }, [location.search, setStateOpenKeys]);

  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  const onSelect = (info) => {
    const key = info.key;
    let category = "";

    if (menuItems[0].children.some((item) => item.key === key)) {
      category = "chude";
    } else if (menuItems[1].children.some((item) => item.key === key)) {
      category = "mausac";
    } else if (menuItems[2].children.some((item) => item.key === key)) {
      category = "gia";
    } else if (menuItems[3].children.some((item) => item.key === key)) {
      category = "hinhdang";
    }

    const updatedFilters = { ...selectedFilters };
    if (updatedFilters[category].includes(key)) {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== key
      );
    } else {
      updatedFilters[category].push(key);
    }

    setSelectedFilters(updatedFilters);

    const queryParams = Object.entries(updatedFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([key, values]) => `${key}=${encodeURIComponent(values.join("&&"))}`)
      .join("&");

    navigate(`/san-pham?${queryParams}`);
  };

  const selectedKeys = [
    ...selectedFilters.chude,
    ...selectedFilters.mausac,
    ...selectedFilters.gia,
    ...selectedFilters.hinhdang,
  ];

  return (
    <div className="product-sider">
      <Menu
        mode="inline"
        multiple
        selectedKeys={selectedKeys}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        items={menuItems}
        style={{
          width: 256,
        }}
      />
    </div>
  );
}

export default ProductSider;
