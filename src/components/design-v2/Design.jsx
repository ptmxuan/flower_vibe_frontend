import AppProvider from "./AppContext";

import {
  BouquetBack,
  BouquetFront,
  FlowerBouquetCoverArea,
} from "./components/Bouquets";
import { AddPanel } from "./components/AddPanel/AddPanel";
import { ControlPanel } from "./components/ControlPanel";
import { IngredientDispenser } from "./components/IngredientDispenser/IngredientDispenser";

import "./App.sass";

const Design2 = () => {
  return (
    <AppProvider>
      <div className="style-box">
        <BouquetBack />
        <FlowerBouquetCoverArea />
        <BouquetFront />

        <IngredientDispenser />

        <ControlPanel />

        <AddPanel />
      </div>
    </AppProvider>
  );
};

export default Design2;
