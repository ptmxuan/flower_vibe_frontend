import React, { useContext, useState } from 'react';
import { Badge, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AppContext } from '../../AppContext';
import './TotalComposition.sass';

export const TotalComposition = () => {
  const { ingreds, setIngreds } = useContext(AppContext); // Thêm setIngreds để cập nhật context
  const [hoveredType, setHoveredType] = useState(null); // Trạng thái hover

  if (!ingreds || ingreds.length === 0) {
    return null; // Ẩn toàn bộ nếu danh sách rỗng
  }

  // Nhóm các nguyên liệu và tính số lượng của mỗi loại
  const groupedIngreds = ingreds.reduce((acc, ingred) => {
    acc[ingred.type] = (acc[ingred.type] || 0) + 1;
    return acc;
  }, {});

  // Hàm xử lý xóa tất cả nguyên liệu thuộc một type
  const handleRemoveType = (type) => {
    const filteredIngreds = ingreds.filter((ingred) => ingred.type !== type);
    setIngreds(filteredIngreds); // Cập nhật context
  };

  return (
    <div className="total_composition hidden-element">
      {Object.keys(groupedIngreds).map((type) => {
        const count = groupedIngreds[type];
        return (
          <div
            key={type}
            className="total_composition__item"
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <Badge
              count={
                hoveredType === type ? (
                  <Tooltip color={'white'} placement="top" title={`Xóa tất cả ${type}`} onClick={() =>handleRemoveType(type)}>
                    <CloseOutlined
                      className='total_composition__item--btn'
                    />
                  </Tooltip>
                ) : (
                  count
                )
              }
              showZero
              className="total_composition__badge"
            >
              <span className="total_composition__text">{type}</span>
            </Badge>
          </div>
        );
      })}
    </div>
  );
};
