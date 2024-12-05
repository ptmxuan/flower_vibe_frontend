import { useEffect, useState, useRef, useCallback } from "react";
import { TypeofStatisticData } from "@/constants/TypeofStatistic";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StatisticProduct.css";
import { differenceInDays, format } from "date-fns";

function StatisticProduct() {
return (
  <div className= "statistic-product"></div>
);
}

export default StatisticProduct;
