import "@/styles/Design.scss";
import AppProvider from "./AppContext";
import { AddPanel } from "./components/AddPanel/AddPanel";
import { IngredientDispencer } from "./components/IngredientDispencer/IngredientDispencer";


import './App.sass';
import { PizzaBaseBack } from "./components/PizzaBase/PizzaBaseBack";
import { PizzaBaseFront } from "./components/PizzaBase/PizzaBaseFront";

const Design2 = () =>{

  return (
    <AppProvider>
      <div className="style-box">
        
        <PizzaBaseBack />
        <PizzaBaseFront />
        <div className="pizza pizza_white_page"></div>

        <IngredientDispencer />

        <AddPanel />
      </div>
    </AppProvider>
  );
}

export default Design2;
