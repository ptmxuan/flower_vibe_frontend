import { useContext, useState } from 'react';
import { Collapse, Input } from 'antd';
import './AddPanel.sass';
import { AppContext } from '../../AppContext';
import { AddIngredient } from './AddIngredient/AddIngredient';
import { Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

export const AddPanel = () => {
  const { addButtonList } = useContext(AppContext);
  const [activePanel, setActivePanel] = useState(['Hoa hồng']); // Active panel mặc định
  const [searchTerm, setSearchTerm] = useState(''); // Lưu trữ từ khóa tìm kiếm

  const onCollapseChange = (keys) => {
    setActivePanel(keys); // Cập nhật trạng thái collapse đang mở
  };

  const onSearch = (value) => {
    setSearchTerm(value); // Cập nhật từ khóa tìm kiếm
    // Tìm panel nào chứa thành phần có tên khớp với từ khóa
    const matchedKey = Object.keys(addButtonList).find((key) =>
      addButtonList[key].some((ingredient) =>
        ingredient.toLowerCase().includes(value.toLowerCase())
      )
    );
    if (matchedKey) {
      setActivePanel([matchedKey]); // Mở panel chứa thành phần khớp
    } else {
      setActivePanel([]); // Đóng tất cả panel nếu không tìm thấy
    }
  };

  return (
    <div className="ingred_adder hidden-element">
      <Title level={4}>Danh sách các thành phần thiết kế</Title>
      {/* Ô tìm kiếm */}
      <Search
        size='large'
        placeholder="Nhập tên thành phần"
        allowClear
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
      />
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
                <span style={{ fontSize: 14, fontWeight: 500 }}>{key}</span>
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
