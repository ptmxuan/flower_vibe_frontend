import React, { useState } from "react";
import { Input } from "antd";
import "@/styles/SearchInput.scss";
import Header from "@/components/header/Header";
const { Search } = Input;

const handleSearch = (value, _e, info, setSearchValue) => {
  console.log(info?.source, value);
  setSearchValue("");
};

function SearchInput() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <div className="search-input">
        <div className="search-bar">
          <Search
            value={searchValue}
            style={{ width: "100%", borderRadius: "50px" }}
            size="large"
            placeholder="Tìm kiếm sản phẩm"
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(value, e, info) =>
              handleSearch(value, e, info, setSearchValue)
            }
          />
        </div>
      </div>
    </>
  );
}

export default SearchInput;
