import { useContext, useState } from 'react';
import { Collapse } from 'antd';
import './AddPanel.sass';
import { AppContext } from '../../AppContext';
import { AddIngredient } from './AddIngredient/AddIngredient';
import { Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

export const AddPanel = () => {
  const { addButtonList } = useContext(AppContext);
  const [activePanel, setActivePanel] = useState(['Hoa hồng']); // Active panel mặc định

  const onCollapseChange = (keys) => {
    setActivePanel(keys); // Cập nhật trạng thái collapse đang mở
  };

  return (
    <div className="ingred_adder hidden-element">
      <Title level={4}>Danh sách các thành phần thiết kế</Title>
      <Collapse 
        accordion 
        activeKey={activePanel} 
        onChange={onCollapseChange} 
        className="ingred_adder__collapse"
      >
        {Object.keys(addButtonList).map((key) => (
          <Panel
            key={key}
            header={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{fontSize: 14, fontWeight: 500}}>{key}</span>
              </div>
            }
          >
            <div className="ingred_adder__buttons">
              {addButtonList[key].map((elem, idx) => (
                <AddIngredient key={`${elem}-${idx}`} type={elem} />
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
