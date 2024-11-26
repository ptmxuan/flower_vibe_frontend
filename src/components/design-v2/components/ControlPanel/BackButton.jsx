import { RollbackOutlined } from "@ant-design/icons";
import { Button, Tooltip, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.sass";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    Modal.confirm({
      title: "Thay đổi sẽ không được lưu",
      content: "Bạn muốn tiếp tục chứ?",
      okText: "Tiếp tục",
      cancelText: "Hủy",
      onOk: () => navigate("/"),
      onCancel: () => console.log("Hủy bỏ"),
    });
  };

  return (
    <div className="temporary_save">
      <Tooltip
        className="temporary_save__tooltip"
        placement="bottom"
        title={"Thoát khỏi thiết kế"}
      >
        <Button
          className="temporary_save__button"
          size="large"
          icon={<RollbackOutlined />}
          onClick={handleClick}
        >
          Quay lại
        </Button>
      </Tooltip>
    </div>
  );
};
