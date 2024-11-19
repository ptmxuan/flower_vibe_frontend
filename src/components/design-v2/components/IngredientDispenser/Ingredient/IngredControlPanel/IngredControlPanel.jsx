import React, { useEffect } from 'react';
import { IngredientControl } from './IngredientControl/IngredientControl';
import { RotateLeftOutlined, ZoomInOutlined, ZoomOutOutlined, ArrowUpOutlined, ArrowDownOutlined, RotateRightOutlined } from '@ant-design/icons';

import './IngredControlPanel.sass';

export const IngredControlPanel = ({ listener, ingredControl }) => {
  useEffect(() => {
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

  const controlsConfig = [
    { type: 'counter', icon: <RotateLeftOutlined style={{transform: 'rotate(-90deg)'}}/>, title: 'Xoay trái' },
    { type: 'rotate', icon: <RotateRightOutlined style={{transform: 'rotate(90deg)'}}/>, title: 'Xoay phải' },
    { type: 'shrink', icon: <ZoomOutOutlined />, title: 'Thu nhỏ' },
    { type: 'enlarge', icon: <ZoomInOutlined />, title: 'Phóng to' },
    { type: 'higher', icon: <ArrowUpOutlined />, title: 'Đưa lên trên' },
    { type: 'lower', icon: <ArrowDownOutlined />, title: 'Hạ xuống dưới' },
  ];

  const controls = controlsConfig.map(({ type, icon, title }, idx) => (
    <IngredientControl
      key={idx + type}
      controller={() => ingredControl(type, 15)}
      icon={icon}
      title={title}
    />
  ));

  return <div className="ingred_control_panel">
    {controls}
    </div>;
};
