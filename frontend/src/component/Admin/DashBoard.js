import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./DashBoard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmminProducts } from "../../action/productAction.js";
import { Chart, registerables } from "chart.js";
import { getAllOrders } from "../../action/orderAction.js";
import { getAllUsers } from "../../action/userAction.js";
Chart.register(...registerables);

const DashBoard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });

  useEffect(() => {
    dispatch(getAllAdmminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);


  let totalAmount =0
  orders && orders.forEach((item)=>{
    totalAmount+=item.totalPrice
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgrondColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const DoughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgrondColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashBoard">
      <Sidebar />
      <div className="dashBoardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashBoardSummary">
          <div>
            <p>
              Total Amoount <br /> ₹ {totalAmount}
            </p>
          </div>

          <div className="dashBoardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughtnutChart">
          <Doughnut data={DoughnutState} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
