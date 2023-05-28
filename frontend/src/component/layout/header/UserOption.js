import React, { Fragment, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../action/userAction.js";
import {
  Dashboard,
  ExitToApp,
  ListAlt,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { Backdrop, SpeedDialAction, SpeedDial } from "@mui/material";


const UserOption = (props) => {
  const { cartItems } = useSelector((state) => state.cart);

  // use useNavigate hook
  let navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const options = [
    {
      icon: <ListAlt />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <Person />,
      name: "Profile",
      func: account,
    },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    {
      icon: <ExitToApp />,
      name: "Logout",
      func: logOut,
    },
  ];

  if (props.user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }

  function logOut() {
    dispatch(logOutUser());
    alert.success("Logout Successfully");
    navigate("/");
  }

  return (
    <Fragment>
      <Backdrop open={open} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={props.user.avatar.url ? props.user.avatar.url : "/profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => {
          return (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth < 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
