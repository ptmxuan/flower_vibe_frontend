import { createContext, useEffect, useState } from "react";

// SVG Thiết kế
import { ReactComponent as HoaHong } from "./media/hoahong.svg";
import { ReactComponent as HoaHongHong } from "./media/hoahonghong.svg";
import { ReactComponent as HoaMauDon } from "./media/hoamaudon.svg";

import { useChuDeWithName } from "@/hooks/useChuDeWithName";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const { getChuDesbyName, chuDesWithName } = useChuDeWithName();

  const [finalCost, setFinalCost] = useState(0);
  const [ingreds, setIngreds] = useState([]);
  const [currentIngred, setCurrentIngred] = useState(null);
  const [addButtonList, setAddButtonList] = useState({});
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState({
    "Lẳng hoa hướng dương": HoaHong,
    "Bó hoa khô mini": HoaMauDon,
    "Bó hoa hồng mix trắng": HoaHongHong,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getChuDesbyName("Nguyên vật liệu thiết kế hoa");
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chuDesWithName?.sanPhams?.length) {
      const groupedData = chuDesWithName.sanPhams.reduce((acc, product) => {
        const groupKey = product.ten
          .split(" ")
          .slice(0, 2)
          .join(" ")
          .toLowerCase(); // Lấy 2 từ đầu tiên
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(product.ten);
        return acc;
      }, {});

      const formattedGroups = Object.entries(groupedData).reduce(
        (acc, [key, values]) => {
          const fullGroupName = values[0]
            .split(" ")
            .slice(0, 2)
            .join(" ")
            .trim();
          acc[fullGroupName] = values;
          return acc;
        },
        {}
      );
      setAddButtonList(formattedGroups);
    }
  }, [chuDesWithName]);

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
        finalCost,
        setFinalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
