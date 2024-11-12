import DetailProduct from "@/components/product/DetailProduct";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useCombineDataContext, useUserContext } from "@/store";

function DetailProductPage() {
  const { products } = useCombineDataContext();
  const userInfor = useUserContext();
  const userId = userInfor?._id;
  const { id } = useParams();
  const product = products?.find((item) => item._id === id);

  if (!product) {
    return <div>Không có sản phẩm</div>;
  }
  return (
    <div className="detail-product-page">
      <DetailProduct product={product} userId={userId} />
    </div>
  );
}

export default DetailProductPage;
