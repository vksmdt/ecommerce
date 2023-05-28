import React, { Fragment } from "react";
import CheckOutSteps from "./Cart/CheckOutSteps.js";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData.js";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  let navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      tax,
      totalPrice,
      shippingCharges,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData titel="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Item:</Typography>
            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity} </b>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Sub Total:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Process To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
