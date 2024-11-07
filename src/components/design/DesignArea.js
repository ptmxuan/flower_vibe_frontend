import React from "react";
import { useDrop } from "react-dnd";
function DesignArea({ onDrop, droppedFlower }) {
  const [{ isOver }, drop] = useDrop({
    accept: "flower",
    drop: (item) => onDrop(item.flower),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      className="design-area"
      ref={drop}
      style={{
        width: "200px",
        height: "200px",
        border: "2px dashed gray",
        position: "relative",
        backgroundColor: isOver ? "#f0f8ff" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {droppedFlower ? (
        <img
          src={droppedFlower.imageUrl}
          alt={droppedFlower.title}
          width={150}
        />
      ) : (
        <p>Thả hoa vào đây</p>
      )}
    </div>
  );
}

export default DesignArea;
