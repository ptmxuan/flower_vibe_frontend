import React, { useState, useEffect } from "react";
import "./Card.scss";
// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  
  return (
    <AnimatePresence>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimatePresence>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
 
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      // layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        {/* <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        /> */}
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Theo tháng hiện tại</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Lấy danh sách các tháng từ series (x)
    const months = param.series.map((item) => item.x);
    setCategories(months);
  }, [param.series]);
  // useEffect(() => {
  //   // Generate categories for the current month
  //   const currentDate = new Date();
  //   const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  //   const newCategories = Array.from({ length: daysInMonth }, (_, index) => {
  //     const day = index + 1;
  //     return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`;
  //   });
  //   setCategories(newCategories);
  // }, []);
  const dataStatistic = param.series.map((item) => item.y)
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "category",
        categories: categories,
      },
      // yaxis: {
      //   min: 0,
      // }
    },
    series: [
      {
        name: param.title, // Tên biểu đồ
        data: dataStatistic, // Dữ liệu từ dataStatistic
      },
    ],
  };

console.log("dataa", dataStatistic, param.series.map((item) => item.y))
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      // layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={() => setExpanded(false)} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type="area" />
      </div>
      <span>Theo tháng hiện tại</span>
    </motion.div>
  );
}

export default Card;
