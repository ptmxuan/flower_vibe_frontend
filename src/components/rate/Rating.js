import React from "react";
import { Rate } from "antd";

function Rating({ rating, allowEdit = false, onRatingChange }) {
  const handleChange = (value) => {
    if (onRatingChange) {
      onRatingChange(value); // Gọi hàm callback khi người dùng thay đổi đánh giá
    }
  };

  return (
    <div className="rating">
      <Rate
        allowHalf
        disabled={!allowEdit} // Cho phép chỉnh sửa nếu allowEdit là true
        value={rating}
        onChange={handleChange} // Gọi hàm handleChange khi có thay đổi
      />
    </div>
  );
}

export default Rating;
