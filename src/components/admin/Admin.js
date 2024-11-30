import Sidebar from "./Sidebar";
import MainDash from "./Dashboard/MainDash/MainDash";

import OrderManage from "../manage/order/OrderManage";
import ManageProductPage from "@/pages/ManageProductPage";

import "@/styles/AdminPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../manage/products/AddProduct";
import StatisticProduct from "../manage/statistic/StatisticProduct";
import ManageChuDePage from "@/pages/ManageChuDe";
import ManageNhaCungCapPage from "@/pages/ManageNhaCungCap";
import ManageNhapHangPage from "@/pages/ManageNhaphang";
// import { useAuth } from "../../hooks/useAuth";

function Admin() {
  const [selectSideBarIndex, setSelectSideBarIndex] = useState(0);
  const [selectDropDownIndex, setSelectDropDownIndex] = useState(0);
  const navigate = useNavigate();
  const handleSidebarIndex = (index, i) => {
    setSelectSideBarIndex(index);
    setSelectDropDownIndex(i);
  };
  //   const { user } = useAuth();

  // if (!user.isAdmin) {
  //   console.log(user);
  //   return navigate("/loginpage");
  // }
  let content = null;
  switch (selectSideBarIndex) {
    case 0:
      content = <MainDash />;
      break;
    case 1:
      content = <OrderManage />;
      break;
    case 2:
      content = <ManageChuDePage />;
      break;
    case 3:
      content = <ManageProductPage />;
      break;
    case 4:
      content = <ManageNhaCungCapPage />;
      break;
    case 5:
      content = <ManageNhapHangPage />;
      break;
    case 6:
      content = <StatisticProduct />;
      break;
    case 7:
      content = <AddProduct />;
      break;

    default:
      break;
  }

  //   useEffect(() => {
  //     console.log(user);
  //     if (!user || !user?.isAdmin) {
  //       // navigate(-1);
  //     }
  //   }, [user]);

  return (
    <div className="Admin" style={{ animation: "fadeInUp 0.6s ease" }}>
      <div className="sidebar-left">
        <Sidebar sendIndexToParent={handleSidebarIndex} />
      </div>

      {/* <OrderManage sendIndexToParent={selectSideBarIndex}/> */}

      {content}

      {/* <ManageProductPage sendIndexToParent={selectSideBarIndex}/> */}
      {/* {<EditProduct/>}
            {<AddProduct/>}  */}
    </div>
  );
}

export default Admin;
