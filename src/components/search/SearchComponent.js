import React, { useState } from "react";
import { Input } from "antd";
import "@/styles/SearchInput.scss";

function SearchComponent({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="search-component">
      <div className="search-bar">
        <Input
          value={searchValue}
          style={{ width: "100%", height: "45px", borderRadius: "30px" }}
          size="large"
          placeholder="Tìm kiếm sản phẩm"
          allowClear
          onChange={handleChange}  
        />
      </div>
    </div>
  );
}

export default SearchComponent;
