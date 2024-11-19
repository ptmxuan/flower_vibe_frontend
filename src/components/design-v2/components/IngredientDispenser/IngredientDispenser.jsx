import { useContext } from 'react';

import './IngredientDispenser.sass';

import { AppContext } from '../../AppContext';
import { Ingredient } from './Ingredient/Ingredient';

import { ReactComponent as BinImg } from '../../media/dispencer_bin.svg';

export const IngredientDispenser = () => {
  const { images, ingreds, setIngreds, currentIngred, setCurrentIngred } = useContext(AppContext);

  const ingredients = ingreds.map((elem) => (
    <Ingredient
      key={elem['id']}
      id={elem['id']}
      type={elem['type']}
      current={currentIngred}
      setCurrent={setCurrentIngred}
      ingreds={ingreds}
      setIngreds={setIngreds}
      imag={images}
    />
  ));

  return (
    <div className="ingred_dispencer second_shot">
      <div className="ingred_dispencer__plate">
        <div className="ingred_dispencer__plate_image">
          {/* <PlateImg /> */}
        </div>
        {ingredients}
      </div>

    {
      currentIngred !== null &&
      <div className="ingred_dispencer__bin hidden-element">
        <div className="ingred_dispencer__bin_image">
          <BinImg />
        </div>
      </div>
    }

    </div>
  );
};
