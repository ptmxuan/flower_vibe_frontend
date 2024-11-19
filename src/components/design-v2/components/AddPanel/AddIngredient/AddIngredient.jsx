import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import { AppContext } from '../../../AppContext';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #7db9e8, #2989d8);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

export const AddIngredient = ({ type }) => {
  const {
    ingreds,
    setIngreds,
    images,
    currentIngred,
    setCurrentIngred,
  } = useContext(AppContext);

  const { styles } = useStyle();

  const onAddHandler = () => {
    setIngreds([
      ...ingreds,
      { type: type, id: '_' + Math.random().toString(36).substr(2, 10) },
    ]);
  };

  const getImage = (type) => {
    const imageEntry = images[type];
    if (Array.isArray(imageEntry)) {
      const randomIndex = Math.floor(Math.random() * imageEntry.length);
      return imageEntry[randomIndex];
    }
    return imageEntry || null;
  };

  const IngredientImage = getImage(type);
  const tooltipContent = (
    <div style={{ textAlign: 'center',maxHeight: '350px',overflow: 'hidden',  maxWidth: '200px' }}>
      {IngredientImage ? (
       <IngredientImage 
       style={{ 
        height: '350px',
        with: '200px',
        transform: 'scale(0.5)', 
        transformOrigin: 'left',
        marginBottom: '8px',
       }}
     />
      ) : (
        <p>Hình ảnh không có sẵn</p>
      )}
    </div>
  );

  return (
    <Tooltip
      color={'white'}
      title={tooltipContent}
      placement="right"
      onVisibleChange={(visible) => {
        if (visible) {
          setCurrentIngred(type);
        }
      }}
    >
      <Button
        type="primary"
        shape="round"
        size="large"
        className={`${styles.linearGradientButton} ingred_adder__button`}
        onClick={onAddHandler}
      >
        {type}
      </Button>
    </Tooltip>
  );
};
