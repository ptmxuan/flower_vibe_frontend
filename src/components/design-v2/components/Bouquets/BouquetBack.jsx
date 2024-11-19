import { useContext } from "react";

import "./Bouquet.sass";

import { AppContext } from "../../AppContext";
import { ReactComponent as BoHoaTruoc } from "../../media/bohoa_xanh.svg";

export const BouquetBack = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div
      className="bouquet_building bouquet_building_back first_shot"
      onClick={() => {
        setCurrentIngred(null);
      }}
    >
      <BoHoaTruoc className="bouquet" />
    </div>
  );
};
