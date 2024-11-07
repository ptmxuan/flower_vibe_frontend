import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.scss";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Trang chủ</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
