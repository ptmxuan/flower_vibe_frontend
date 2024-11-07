import { useEffect, useState, useRef, useCallback } from "react";
import { TypeofStatisticData } from "@/constants/TypeofStatistic";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StatisticProduct.css";
import { differenceInDays, format } from "date-fns";

function StatisticProduct() {
  const [fillter, setFillter] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const serverApi = process.env.REACT_APP_SERVER_URL;
  const serverUrl = process.env.REACT_APP_SERVER;



  async function fetchData() {
    const data = await axios
      .get(serverApi + "/products")
      .then((res) => {
        setProducts(res.data.data);
        setAllProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteProduct(id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const data = await axios
        .delete(serverApi + "/products/" + id)
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setProducts(
      allProducts.filter((item) => {
        console.log("test:   " + item.quantity);
        const daysRemaining = differenceInDays(item.exp, new Date());
        if (fillter === "") return item;
        else {
          if (fillter === "Bán chạy") {
            return item.saleCount > 5;
          } else if (fillter === "Sắp hết hạn") {
            console.log(daysRemaining);
            return daysRemaining <= 12 && daysRemaining >= 0;
          } else if (fillter === "Hết hạn") {
            return daysRemaining < 0;
          } else if (fillter === "Sắp hết hàng") {
            return item.quantity > 0 && item.quantity <= 5;
          } else if (fillter === "Hết hàng") {
            return item.quantity <= 0;
          }
        }
      })
    );
  }, [fillter]);

  return (
    <div className="wrapper-statistic">
      <div className="title-page">
        <h1>Quản lý sản phẩm</h1>
      </div>
      <div className="select-type">
        <h5>Loại sản phẩm</h5>
        <div className="fillter-type">
          {TypeofStatisticData.map((type) => {
            if (type.title)
              return (
                <button
                  key={type.id}
                  className={
                    fillter === type.title ? "active btn-type" : "btn-type"
                  }
                  onClick={() => setFillter(type.title)}
                >
                  {type.title}
                </button>
              );
            else return null;
          })}
        </div>
        <button className="btn-reset" onClick={() => setFillter("")}>
          Đặt lại
        </button>
      </div>
      <div className="length-list">
        <p>{products.length} sản phẩm</p>
      </div>
      <section className="itemList manager-products">
        {products.length > 0 &&
          products.map((item) => {
            const formattedDate = format(item.exp, "dd/MM/yyyy");
            const daysRemaining = differenceInDays(item.exp, new Date());
            let expirationStatus;
            if (daysRemaining > 12) {
              expirationStatus = "Còn hạn";
            } else if (daysRemaining <= 12 && daysRemaining >= 0) {
              expirationStatus = "Sắp hết hạn";
            } else {
              expirationStatus = "Hết hạn";
            }
            return (
              <div className="block-item " key={item.ProductNo}>
                <div className="item-detail">
                  <img src={serverUrl + item.images[0].path} alt={item.name} />
                  {item.name}
                </div>
                <div className="saled">
                  <p>Đã bán:</p>
                  <p>{item.saleCount}</p>
                </div>
                <div className="stored">
                  <p>Còn lại:</p>
                  <p>{item.quantity}</p>
                </div>
                <div className="exp">
                  <p>Hạn sử dụng: {formattedDate}</p>
                </div>
                <div className="exp-status">
                  <p>Trạng thái: {expirationStatus}</p>
                </div>
                <div className="control-manage">
                  {/* <Link to={{ pathname: `/admin/addProduct/${item._id}` }}style={{ width: 'auto', display: 'inline-block' }}><i class="fa-solid fa-circle-plus"></i></Link> */}
                  <Link to={{ pathname: `/admin/editProduct/${item._id}` }}>
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                  <p>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteProduct(item._id)}
                    ></i>
                  </p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default StatisticProduct;
