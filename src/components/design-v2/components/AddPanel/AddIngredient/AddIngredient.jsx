import React, { useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { AppContext } from "../../../AppContext";
import { createStyles } from "antd-style";
import { useChuDeWithName } from "@/hooks/useChuDeWithName";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #7db9e8, #2989d8);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

export const AddIngredient = ({ type }) => {
  const { ingreds, setIngreds, images, currentIngred, setCurrentIngred } =
    useContext(AppContext);

  const { styles } = useStyle();

  const { getChuDesbyName, chuDesWithName } = useChuDeWithName();

  const [item, setItem] = useState({});

  useEffect(() => {
    getChuDesbyName("Nguyên vật liệu thiết kế hoa");
  }, []);

  useEffect(() => {
    if (chuDesWithName?.sanPhams?.length && type) {
      const matchedItem = chuDesWithName?.sanPhams.find(
        (item) => item.ten === type
      );
      setItem(matchedItem || {});
    }
  }, [chuDesWithName, type]);

  const onAddHandler = () => {
    setIngreds([
      ...ingreds,
      { type: type, id: "_" + Math.random().toString(36).substr(2, 10) },
    ]);
  };

  const getImage = (type) => {
    const imageEntry = images[type];
    if (Array.isArray(imageEntry)) {
      const randomIndex = Math.floor(Math.random() * imageEntry.length);
      return imageEntry[randomIndex];
    }
    return imageEntry || null;
  };

  const IngredientImage = getImage(type);

  const tooltipContent = (
    <div
      style={{
        textAlign: "center",
        maxHeight: "400px",
        marginBottom: "100px",
        overflow: "visible",
        maxWidth: "200px",
        color: "black",
      }}
    >
      {IngredientImage ? (
        <IngredientImage
          style={{
            height: "350px",
            with: "200px",
            marginTop: "-80px",
            transform: "scale(0.5)",
            transformOrigin: "left",
            marginBottom: "8px",
          }}
        />
      ) : (
        <p>Hình ảnh không có sẵn</p>
      )}
      <box
        style={{
          marginBottom: "-100px",
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <span>Tên: {item.ten}</span>
        <span>Giá: {item?.gia?.toLocaleString()} VNĐ</span>
        <Tooltip title={item.description}>
          <span>
            Mô tả:{" "}
            {item?.description?.length > 20
              ? `${item.description.slice(0, 20)}...`
              : item.description}
          </span>
        </Tooltip>
        <span
          style={{
            cursor: "pointer",
            color: "#1890ff",
          }}
          onClick={() =>
            window.open(
              `${window.location.origin}/san-pham/${item.id}`,
              "_blank"
            )
          }
        >
          Xem chi tiết
        </span>
      </box>
    </div>
  );

  return (
    <Tooltip
      color={"white"}
      title={tooltipContent}
      placement="right"
      onVisibleChange={(visible) => {
        if (visible) {
          setCurrentIngred(type);
        }
      }}
    >
      <Button
        type="primary"
        shape="round"
        size="large"
        className={`${styles.linearGradientButton} ingred_adder__button`}
        onClick={onAddHandler}
      >
        {type}
      </Button>
    </Tooltip>
  );
};
