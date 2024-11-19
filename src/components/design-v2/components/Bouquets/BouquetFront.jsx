import { useContext } from "react";

import "./Bouquet.sass";

import { AppContext } from "../../AppContext";
import { ReactComponent as BoHoa } from "../../media/bohoa_truoc.svg";

export const BouquetFront = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div
      className="bouquet_building bouquet_building_front third_shot"
      onClick={() => {
        setCurrentIngred(null);
      }}
    >
      <BoHoa className="bouquet" />
    </div>
  );
};
