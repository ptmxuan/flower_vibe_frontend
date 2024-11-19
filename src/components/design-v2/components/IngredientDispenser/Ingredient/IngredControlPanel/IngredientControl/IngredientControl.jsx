import React from 'react';
import './IngredientControl.sass';
import { Button, Tooltip } from 'antd';

export const IngredientControl = ({ controller, icon, title }) => {
  return (
    <div className="ingredient_control">
      <Tooltip className='ingredient_control__tooltip' placement="bottom" title={title} onClick={controller}>
        <Button className='ingredient_control__button' size='large' shape="circle" icon={icon} />
      </Tooltip>
    </div>
  );
};
