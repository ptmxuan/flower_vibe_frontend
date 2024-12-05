import React from "react";
import Cards from "../Cards/Cards";
import TableOrder from "../Table/TableOrder";
import "./MainDash.scss";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Trang chủ</h1>
      <Cards />
      <TableOrder />
    </div>
  );
};

export default MainDash;
