import { useCombineDataContext } from "@/store/CombinedDataContext";
import { UilUsdSquare, UilMoneyWithdrawal, UilClipboardAlt } from "@iconscout/react-unicons";

export const useCardsData = () => {
  const { products } = useCombineDataContext();

  return [
    {
      title: "Doanh thu",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      value: "25,970,000 VND",
      png: UilUsdSquare,
      series: [
        {
          name: "Doanh thu",
          data: [31, 40, 28, 51, 42, 109, 30],
        },
      ],
    },
    {
      title: "Đơn hàng",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "14 Đơn hàng",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Số lượng đơn hàng",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Sản phẩm",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: `${products ? products.length : 0} Sản phẩm`,
      png: UilClipboardAlt,
      series: [
        {
          name: "Số lượng sản phẩm",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
};
