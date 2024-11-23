import { useParams } from "react-router-dom";
import { useCombineDataContext, useUserContext } from "@/store";
import DetailProduct from "@/components/product/DetailProduct";

function DetailProductPage() {
  const { products } = useCombineDataContext();

  const userInfo = useUserContext();

  const userId = userInfo?._id;

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
