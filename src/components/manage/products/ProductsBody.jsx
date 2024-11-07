import { useEffect, useState, useRef, useCallback } from "react";
import "./Products.css";
import { TypeofProductData } from "@/constants/TypeofProductData";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsBody() {
  const [fillter, setFillter] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const serverApi = process.env.REACT_APP_SERVER_URL;
  const serverUrl = process.env.REACT_APP_SERVER;

  useEffect(() => {
    setProducts(
      allProducts.filter((item) => {
        if (fillter === "") return item;
        else return item.type === fillter;
      })
    );
  }, [fillter]);

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

  return (
    <div className="wrapper">
      <div className="title-page">
        <h1>Quản lý sản phẩm</h1>
      </div>
      <div className="select-type">
        <h5>Loại sản phẩm</h5>
        <div className="fillter-type">
          {TypeofProductData.map((type) => {
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
                <div className="control-manage">
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

export default ProductsBody;
