import React, { useEffect, useState } from "react";
import "./Cards.scss";
import Card from "../Card/Card";
import { useCombineDataContext } from "@/store";
import { cardsData } from "../../Data/Data";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const Cards = () => {
  const { orders, nhapHangs } = useCombineDataContext(); 
  const [revenueData, setRevenueData] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // Tổng số đơn hàng trong tháng
  const [totalProductSales, setTotalProductSales] = useState(0); // Tổng lượt mua trong products
  const [series, setSeries] = useState([]);
  const [totalOrderSeries, setTotalOrderSeries] = useState([]);
  const [totalProductSeries, setTotalProductSeries] = useState([]);

  useEffect(() => {
    if (orders?.length) {
      // Lấy ngày đầu và cuối của tháng hiện tại
      const currentDate = dayjs();
      const startOfMonth = currentDate.startOf("month"); // Ngày đầu tháng
      const endOfMonth = currentDate.endOf("month"); // Ngày cuối tháng

      // Nhóm đơn hàng theo ngày trong tháng hiện tại
      const orderGroups = orders.reduce((acc, order) => {
        const orderDate = dayjs(order.createdAt);

        // Kiểm tra nếu đơn hàng nằm trong tháng hiện tại và có ngày hợp lệ
        if (orderDate.isValid() && orderDate.isBetween(startOfMonth, endOfMonth, 'day', '[]')) {
          const day = orderDate.format("YYYY-MM-DD"); 
          if (!acc[day]) {
            acc[day] = 0;
          }
          acc[day]++;
        }
        return acc;
      }, {});

      // Cập nhật tổng số đơn hàng trong tháng
      const totalOrdersInMonth = Object.values(orderGroups).reduce((acc, count) => acc + count, 0);
      setTotalOrders(totalOrdersInMonth); // Cập nhật tổng số đơn hàng

      // Tạo danh sách đầy đủ các ngày trong tháng
      const daysInMonth = currentDate.daysInMonth();
      const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) =>
        startOfMonth.add(index, "day").format("YYYY-MM-DD")
      );

      // Tạo series cho biểu đồ
      const dailySeries = daysOfMonth.map((day) => ({
        x: day,
        y: orderGroups[day] || 0, // Nếu không có đơn hàng thì y = 0
      }));

      console.log("Dữ liệu dailySeries:", dailySeries); // Kiểm tra dữ liệu
      setTotalOrderSeries(dailySeries);
    }
  }, [orders]);

  useEffect(() => {
    if (orders?.length) {
      const currentDate = dayjs();
      const startOfMonth = currentDate.startOf("month"); // Ngày đầu tháng
      const endOfMonth = currentDate.endOf("month"); // Ngày cuối tháng
  
      // Nhóm số lượng sản phẩm bán ra theo ngày trong tháng
      const productSalesPerDay = orders.reduce((acc, order) => {
        const orderDate = dayjs(order.createdAt);
  
        // Kiểm tra nếu đơn hàng nằm trong tháng hiện tại và có ngày hợp lệ
        if (orderDate.isValid() && orderDate.isBetween(startOfMonth, endOfMonth, 'day', '[]')) {
          const day = orderDate.format("YYYY-MM-DD");
  
          // Lặp qua các sản phẩm trong đơn hàng
          order.items.forEach((item) => {
            if (!acc[day]) {
              acc[day] = 0;
            }
            acc[day] += item.quantity;
          });
        }
        return acc;
      }, {});
  
      // Tạo danh sách đầy đủ các ngày trong tháng
      const daysInMonth = currentDate.daysInMonth();
      const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) =>
        startOfMonth.add(index, "day").format("YYYY-MM-DD")
      );
  
      // Tạo series với trục x là các ngày trong tháng
      const productSalesSeries = daysOfMonth.map((day) => ({
        x: day,
        y: productSalesPerDay[day] || 0, // Nếu không có sản phẩm bán ra thì y = 0
      }));
  
      console.log("Dữ liệu sản phẩm bán ra theo ngày:", productSalesSeries); // Kiểm tra dữ liệu
      setTotalProductSeries(productSalesSeries); // Cập nhật dữ liệu cho biểu đồ sản phẩm
  
      // Tính tổng số lượng sản phẩm bán ra
      const totalSales = Object.values(productSalesPerDay).reduce((acc, sales) => acc + sales, 0);
      setTotalProductSales(totalSales); // Cập nhật tổng số lượng sản phẩm bán ra
    }
  }, [orders]);
  useEffect(() => {
    if (orders?.length && nhapHangs?.length) {
      const currentDate = dayjs();
      const startOfMonth = currentDate.startOf("month"); // Ngày đầu tháng
      const endOfMonth = currentDate.endOf("month"); // Ngày cuối tháng

      const revenuePerDay = {};

      // Xử lý doanh thu từ đơn hàng (orders)
      orders.forEach((order) => {
        const orderDate = dayjs(order.createdAt).format("YYYY-MM-DD");
        if (dayjs(orderDate).isBetween(startOfMonth, endOfMonth, "day", "[]")) {
          if (!revenuePerDay[orderDate]) {
            revenuePerDay[orderDate] = 0;
          }
          order.items.forEach((item) => {
            revenuePerDay[orderDate] += item.price * item.quantity;
          });
        }
      });

      // Xử lý doanh thu từ nhập hàng (nhapHangs)
      nhapHangs.forEach((nhapHang) => {
        const importDate = dayjs(nhapHang.createdAt).format("YYYY-MM-DD");
        if (dayjs(importDate).isBetween(startOfMonth, endOfMonth, "day", "[]")) {
          if (!revenuePerDay[importDate]) {
            revenuePerDay[importDate] = 0;
          }
          nhapHang.products.forEach((product) => {
            revenuePerDay[importDate] -= product.importPrice * product.quantity;
          });
        }
      });

      // Tạo danh sách tất cả các ngày trong tháng
      const daysInMonth = currentDate.daysInMonth();
      const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) =>
        startOfMonth.add(index, "day").format("YYYY-MM-DD")
      );

      // Tạo series dữ liệu cho biểu đồ
      const revenueSeries = daysOfMonth.map((day) => ({
        x: day,
        y: revenuePerDay[day] || 0, // Nếu không có doanh thu cho ngày đó, đặt y = 0
      }));

      // Sắp xếp series theo ngày
      const sortedRevenueSeries = revenueSeries.sort((a, b) => dayjs(a.x).isBefore(dayjs(b.x)) ? -1 : 1);

      // Tính tổng doanh thu trong tháng
      const totalRevenue = sortedRevenueSeries.reduce((acc, cur) => acc + cur.y, 0);

      setRevenueData(totalRevenue); // Cập nhật tổng doanh thu
      setSeries(sortedRevenueSeries); // Cập nhật dữ liệu cho biểu đồ
    }
  }, [orders, nhapHangs]);
  
  
console.log("thống kekes",revenueData, series)
  return (
    <div className="Cards">
      <div className="parentContainer">
        <Card 
          title="Doanh thu"
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
          value={revenueData.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          png={cardsData[0].png}
          series={series}
        />
      </div>

      <div className="parentContainer">
        <Card 
          title="Đơn hàng"
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
          value={totalOrders} // Hiển thị tổng số đơn hàng trong tháng
          png={cardsData[1].png}
          series={totalOrderSeries}
        />
      </div>

      <div className="parentContainer">
        <Card 
          title="Sản phẩm"
          color={{
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          }}
          value={totalProductSales} // Hiển thị tổng lượt mua sản phẩm
          png={cardsData[2].png}
          series={totalProductSeries}
        />
      </div>
    </div>
  );
};

export default Cards;
