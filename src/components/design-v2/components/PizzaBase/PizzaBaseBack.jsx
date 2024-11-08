import { useContext } from 'react';

import './PizzaBase.sass';

import { AppContext } from '../../AppContext';
import { ReactComponent as BoHoaTruoc } from '../../media/bohoa_xanh.svg';


export const PizzaBaseBack = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div
      onClick={() => {
        setCurrentIngred(null);
      }}
    >
      <BoHoaTruoc className="pizza pizza_back" />
    </div>
  );
};
