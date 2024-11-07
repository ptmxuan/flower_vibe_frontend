import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { Link } from "react-router-dom";
const typeProductArray = [
  "Hoa hồng",
  "Hoa sinh nhật",
  "Lẳng hoa khai trương",
  "Hoa cẩm tú cầu",
  "Hoa tốt nghiệp",
  "Hoa lan",
];

export default function AddProduct() {
  const [nameValue, setnameValue] = useState("");
  const [descriptionValue, setdescriptionValue] = useState("");
  const [quantityValue, setquantityValue] = useState("");
  const [quantitypValue, setquantitypValue] = useState("");
  const [weightValue, setweightValue] = useState("");
  const [priceValue, setpriceValue] = useState("");
  const [expValue, setexpValue] = useState("");
  const [typeValue, settypeValue] = useState("");
  const [fastdescriptionValue, setfastdescriptionValue] = useState("");
  const [featureValue, setfeatureValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlecreateproduct = (e) => {
    console.log("type: ", typeValue);
    console.log("img ", image);
    console.log("url: ", imageUrl);
    axios
      .post(
        "http://localhost:8080/api/products",
        {
          name: nameValue,
          description: descriptionValue,
          quantity: quantityValue,
          quantityp: quantitypValue,
          weight: weightValue,
          price: priceValue,
          exp: expValue,
          type: typeValue,
          fastdescription: fastdescriptionValue,
          feature: featureValue,
          image: image, // Gửi ảnh lên máy chủ
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        alert("thanh cong");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="AddProduct">
      <form className="add-form">
        <div className="title-add">
          <p>THÊM MỚI SẢN PHẨM</p>
        </div>
        <div className="add-label">
          <h2>THÔNG TIN SẢN PHẨM</h2>
          <label className="label form-product" htmlFor="name">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name-product"
            className=" input-form"
            value={nameValue}
            onChange={(e) => setnameValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="typeofproduct">
            Loại sản phẩm
          </label>

          <select
            id="typeofproduct"
            name="typeofproduct"
            onChange={(e) => {
              settypeValue(e.target.value);
            }}
          >
            {typeProductArray.map((item, index) => {
              return (
                <option value={item} key={index} defaultChecked={index === 0}>
                  {item}
                </option>
              );
            })}
          </select>
          <label className="label form-product" htmlFor="characteristic">
            Đặc tính
          </label>
          <input
            type="text"
            id="characteristic"
            className=" input-form"
            value={featureValue}
            onChange={(e) => setfeatureValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="summary">
            Mô tả nhanh
          </label>
          <input
            type="text"
            id="summary"
            className=" input-form"
            value={fastdescriptionValue}
            onChange={(e) => setfastdescriptionValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="description">
            Mô tả sản phẩm
          </label>
          <input
            type="text"
            id="description"
            className=" input-form"
            value={descriptionValue}
            onChange={(e) => setdescriptionValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="weight">
            Khối lượng
          </label>
          <input
            type="text"
            id="weight"
            className=" input-form"
            value={weightValue}
            onChange={(e) => setweightValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="quantity">
            Số lượng đóng gói
          </label>
          <input
            type="text"
            id="quantityp"
            className=" input-form"
            value={quantityValue}
            onChange={(e) => setquantityValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="expiry">
            Hạn sử dụng
          </label>
          <input
            type="date"
            id="expiry"
            className=" input-form"
            value={expValue}
            onChange={(e) => setexpValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="price">
            Giá bán
          </label>
          <input
            type="text"
            id="price"
            className=" input-form"
            value={priceValue}
            onChange={(e) => setpriceValue(e.target.value)}
          ></input>
          <label className="label form-product" htmlFor="quantity-in-warehouse">
            Số lượng hàng trong kho
          </label>
          <input
            type="text"
            id="quantity-in-warehouse"
            className=" input-form"
            value={quantitypValue}
            onChange={(e) => setquantitypValue(e.target.value)}
          ></input>

          <div className="img-input">
            <label className="label form-product" htmlFor="image">
              Hình ảnh
            </label>
            <label className="image-button" htmlFor="upload-input">
              Thêm ảnh
            </label>
            <input type="text" id="input-text" className="input-form"></input>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="upload-input"
            />

            {imageUrl && (
              <div className="uploaded-image">
                <img src={imageUrl} alt="Uploaded" />
              </div>
            )}
          </div>
          <div className="control-btn">
            <Link to="/admin">
              <button className="cancel-btn">Huỷ bỏ</button>
            </Link>
            <button
              className="add-btn"
              type="button"
              onClick={handlecreateproduct}
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
