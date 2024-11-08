import { useState } from "react";

export const useDesign = () => {
  const [dataPanel, setDataPanel] = useState(["rose"]);

  const [dataImages, setDataImages] = useState([
    {
      id: "1",
      title: "red rose",
      panel: "rose",
      src: ["./media/hoahong.svg"],
    },
    {
      id: "2",
      title: "blue rose",
      panel: "rose",
      src: ["./media/hoahong.svg"],
    },
  ]);

  return { dataPanel, dataImages };
};
