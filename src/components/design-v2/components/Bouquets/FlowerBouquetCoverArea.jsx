import { useContext } from "react";

import "./Bouquet.sass";

import { AppContext } from "../../AppContext";

export const FlowerBouquetCoverArea = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div className="bouquet_building second_shot bouquet_white_page">
      <div
        className="bouquet"
        onClick={() => {
          setCurrentIngred(null);
        }}
      ></div>
    </div>
  );
};
