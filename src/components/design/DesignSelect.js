import React from "react";
import { useDrag } from "react-dnd";
function DesignSelect({ flower }) {
  const [{ isDragging }, drag] = useDrag({
    type: "flower",
    item: { flower },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className="design-select"
      ref={drag}
     
    >
      <img src={flower.imageUrl} alt={flower.title} width={80} />
      <p>{flower.title}</p>
    </div>
  );
}

export default DesignSelect;
