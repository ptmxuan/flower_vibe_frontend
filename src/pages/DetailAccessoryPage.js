import DetailAccessory from "@/components/accessories/DetailAccessory";
import { useParams } from "react-router-dom";
import AccessoryData from "@/constants/AccessoryData";
function DetailAccessoryPage() {
  
  const { id } = useParams();
  
  const access = AccessoryData.find((item) => item.id === parseInt(id));
  
  return (
    <div className="detail-accessory-page">
      <DetailAccessory access={access} />
    </div>
  );
}

export default DetailAccessoryPage;
