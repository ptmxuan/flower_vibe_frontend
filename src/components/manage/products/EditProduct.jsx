import "./EditProduct.css";
import ImageUpload from "../../fixed/ImageUpload";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditProduct() {
  const typeProductArray = ["Hoa bó", "Lẳng hoa", "Chậu hoa"];

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
  const { id } = useParams();
  const serverApi = process.env.REACT_APP_SERVER_URL;
  const serverUrl = process.env.REACT_APP_SERVER;
  const [product, setProduct] = useState({});

  // Hàm chuyển đổi ngày thành định dạng "yyyy-MM-dd"

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

  async function getProduct(id) {
    const data = await axios
      .get(serverApi + "/products/" + id)
      .then((res) => {
        setProduct(res.data.data);
        setnameValue(res.data.data.name);
        setdescriptionValue(res.data.data.description);
        setquantityValue(res.data.data.quantity);
        setquantitypValue(res.data.data.quantityp);
        setweightValue(res.data.data.weight);
        setpriceValue(res.data.data.price);
        setexpValue(res.data.data.exp);
        settypeValue(res.data.data.type);
        setfastdescriptionValue(res.data.data.fastdescription);
        setfeatureValue(res.data.data.feature);
        setImageUrl(res.data.data.images[0].path);
        function formatDate(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();

          // Thêm số 0 vào trước tháng và ngày nếu cần thiết
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }

          return `${year}-${month}-${day}`;
        }

        // Gán giá trị cho expValue sau khi chuyển đổi định dạng
        setexpValue(formatDate(res.data.data.exp));
      })
      .catch((err) => {
        window.location.href = "/admin";
        console.log(err);
      });
  }

  useEffect(() => {
    getProduct(id);
  }, []);

  async function updateProduct(id) {
    const formData = new FormData();

    // Append file and other data to FormData
    formData.append("image", image); // Assuming 'image' is the file
    formData.append("name", nameValue);
    formData.append("description", descriptionValue);
    formData.append("quantity", quantityValue);
    formData.append("quantityp", quantitypValue);
    formData.append("weight", weightValue);
    formData.append("price", priceValue);
    formData.append("exp", expValue);
    formData.append("type", typeValue);
    formData.append("fastdescription", fastdescriptionValue);
    formData.append("feature", featureValue);

    const response = await axios
      .put(serverApi + "/products/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper Content-Type header
        },
      })
      .then((res) => {
        alert("thanh cong");
        window.location.href = "/admin";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="EditProduct">
      <div className="edit-form">
        <div className="title">
          <p> CHỈNH SỬA SẢN PHẨM</p>
        </div>
        <div className="edit-label">
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
            id="quantity"
            className=" input-form"
            value={quantitypValue}
            onChange={(e) => setquantitypValue(e.target.value)}
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
            value={quantityValue}
            onChange={(e) => setquantityValue(e.target.value)}
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
                <img src={serverUrl + imageUrl} alt="Uploaded" />
              </div>
            )}
          </div>
        </div>
        <div className="control-btn">
          <Link to="/admin">
            <button className="cancel-btn">Huỷ bỏ</button>
          </Link>
          <button className="save-btn" onClick={() => updateProduct(id)}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
