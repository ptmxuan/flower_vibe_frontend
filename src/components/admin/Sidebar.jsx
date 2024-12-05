import React, { useState } from "react";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../admin/Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
// import logo from "@/assets/img/"
import '@/styles/Sidebar.scss';

const Sidebar = ({sendIndexToParent}) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  };

// Trong hàm handleDropdownToggle
const handleDropdownToggle = (index) => {
  if (selected === index) {
    // Đã chọn dropdown, bấm lại để đóng dropdown
    setSelected(-1);
  } else {
    // Chưa chọn dropdown, mở dropdown tại index được chọn
    setSelected(index);
    sendIndexToParent(index);
  }
};
const user = JSON.parse(localStorage.getItem("user")) ?? null;

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/dang-nhap";
  alert("Đăng xuất thành công");
}
const handleDropDown = (i) => {
  // Trong trường hợp này, không cần kiểm tra selected === i vì nó đã được kiểm tra trong handleDropdownToggle
  setSelected(-1); // Đóng dropdown khi một option được chọn
  sendIndexToParent(i);
};


  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        <div className="logo">
        <h1>FlowerVibe</h1>
        </div>
        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => handleDropdownToggle(index)} // Sử dụng handleDropdownToggle khi click vào mục menu
            >
              <item.icon />
              <span>{item.heading}</span>
              {/* Hiển thị dropdown nếu được chọn */}
              {index === selected && item.dropdown && (
                <div className="dropdown">
                  {item.dropdown.map((option, i) => (
                    <div className="dropdownOption" key={i=i+4} // Sửa lại đây
                    onClick={() => {
                      handleDropDown(i); // Sử dụng một index duy nhất cho mỗi dropdown option
                    }}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="menuItems" onClick={handleLogout}>
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
