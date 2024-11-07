import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DesignArea from "@/components/design/DesignArea";
import DesignSelect from "@/components/design/DesignSelect";
import { Col, Row } from "antd";
import "@/styles/Design.scss";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const flowerData = [
  {
    title: "Hoa hướng dương",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSuclsFxyhoFQ8PJx-0mq4GDLrsBHscirxAn6TDnKpp0M9HtI9g",
  },
  {
    title: "Hoa hồng",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzdvwxoIS9R5bAalQF9tCUdjG1pO6iEkfwff5HhtlXs5zH2jFk",
  },
  {
    title: "Hoa cẩm tú cầu",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPCpZDqCFyyXzopXgA0_DuNtv8cvgG5bfXzJRLjLSm54ebomGE",
  },
  // Thêm các loại hoa khác nếu cần
];

function Design() {
  const [selectedFlower, setSelectedFlower] = useState(null);

  const handleDrop = (flower) => {
    setSelectedFlower(flower);
  };
  return (
    <>
      <Header />
      <div className="design">
        <DndProvider backend={HTML5Backend}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px",
            }}
          >
            {/* Danh sách các loại hoa */}
            <div style={{ width: "200px" }}>
              <h3>Danh sách hoa</h3>
              {flowerData.map((flower, index) => (
                <DesignSelect key={index} flower={flower} />
              ))}
            </div>

            {/* Khu vực thả */}
            <DesignArea onDrop={handleDrop} droppedFlower={selectedFlower} />
          </div>
        </DndProvider>
      </div>
      <Footer />
    </>
  );
}

export default Design;
