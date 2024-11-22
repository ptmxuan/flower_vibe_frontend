import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function SearchIcon() {
  const nevigate = useNavigate();
  const handleNevigateSearch = () => {
    nevigate("/san-pham");
  };
  return (
    <div className="search-icon">
      <Button
        onClick={handleNevigateSearch}
        shape="circle"
        icon={<SearchOutlined />}
      />
    </div>
  );
}

export default SearchIcon;
