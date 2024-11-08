import { useContext } from 'react';

import './PizzaBase.sass';

import { AppContext } from '../../AppContext';
import { ReactComponent as BoHoa } from '../../media/bohoa_xanh.svg';


export const PizzaBaseFront = () => {
  const { setCurrentIngred } = useContext(AppContext);

  return (
    <div
      onClick={() => {
        setCurrentIngred(null);
      }}
    >
      <BoHoa className="pizza pizza_front" />      
    </div>
  );
};
