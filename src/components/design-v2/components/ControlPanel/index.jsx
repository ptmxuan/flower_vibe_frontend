import React, { useState } from "react";
import { SendButton } from "./SendButton";
import { BackButton } from "./BackButton";

import "./ControlPanel.sass";

export const ControlPanel = () => {
  const [nameDesign, setNameDesign] = useState("Thiết kế 1");

  const handleNameChange = (e) => {
    setNameDesign(e.target.value);
  };

  return (
    <div className="control_panel hidden-element">
      <div className="name">
        <p>Tên: </p>
        <input
          className="custom-input"
          placeholder="Tên thiết kế"
          value={nameDesign}
          onChange={handleNameChange}
        />
      </div>
      <div className="btn">
        <BackButton />
        <SendButton nameDesign={nameDesign} />
      </div>
    </div>
  );
};
