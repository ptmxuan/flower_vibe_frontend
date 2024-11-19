import { createContext, useState } from 'react';
import { ReactComponent as HoaHong } from './media/hoahong.svg';
import { ReactComponent as HoaHongHong } from './media/hoahonghong.svg';
import { ReactComponent as HoaMauDon } from './media/hoamaudon.svg';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [ingreds, setIngreds] = useState([]);
  const [currentIngred, setCurrentIngred] = useState(null);
  const [addButtonList, setAddButtonList] = useState({
    'Hoa hồng': [
      'Hoa hồng đỏ',
      'Hoa mẫu đơn',
      'Hoa hồng',
    ],
    'Hoa hồng 2': [
      'Hoa hồng đỏ',
      'Hoa mẫu đơn',
      'Hoa hồng',
    ],
  });

  const [images, setImages] = useState({
    'Hoa hồng đỏ': HoaHong,
    'Hoa mẫu đơn': HoaMauDon,
    'Hoa hồng': HoaHongHong,
    // 'red rose': [HoaHong,HoaHong],   Nếu có nhiều hơn 1 thì sẽ lấy ngẫu nhiên, hiểu là cùng là hao đỏ nhưng hình dáng khác nhau tí
  });

  return (
    <AppContext.Provider
      value={{
        ingreds,
        setIngreds,
        addButtonList,
        setAddButtonList,
        images,
        setImages,
        currentIngred,
        setCurrentIngred,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;


// import { useDesign } from "@/hooks/useDesign";
// import React, { createContext, Suspense, useState } from "react";

// export const AppContext = createContext(null);

// // Custom lazy function to handle dynamic imports
// export const lazy = (componentImportFn) =>
//   React.lazy(async () => {
//     let obj = await componentImportFn();
//     return typeof obj.default === "function" ? obj : { default: obj.default };
//   });

// const AppProvider = ({ children }) => {
//   const { dataPanel, dataImages } = useDesign();

//   const [ingreds, setIngreds] = useState([]);
//   const [currentIngred, setCurrentIngred] = useState(null);

//   // Initialize addButtonList state based on dataPanel and dataImages
//   const [addButtonList, setAddButtonList] = useState(() =>
//     dataPanel.reduce((acc, panel) => {
//       acc[panel] = dataImages
//         .filter((image) => image.panel === panel)
//         .map((image) => image.title);
//       return acc;
//     }, {})
//   );

//   // Initialize images state with dynamic imports of SVGs using custom lazy
//   const [images, setImages] = useState(() =>
//     dataImages.reduce((acc, image) => {
//       acc[image.title] = image.src.map((src) =>
//         lazy(() => import(`${src}`).catch(() => ({ default: () => null })))
//       );
//       return acc;
//     }, {})
//   );

//   return (
//     <AppContext.Provider
//       value={{
//         ingreds,
//         setIngreds,
//         addButtonList,
//         setAddButtonList,
//         images,
//         setImages,
//         currentIngred,
//         setCurrentIngred,
//       }}
//     >
//       <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
//     </AppContext.Provider>
//   );
// };

// export default AppProvider;

// https://github.com/fuse-box/fuse-box/issues/1646