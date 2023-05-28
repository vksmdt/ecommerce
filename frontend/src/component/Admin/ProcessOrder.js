import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData.js";
import Sidebar from "./Sidebar.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import {
  getOrderDetails,
  updateOrder,
  clearError,
} from "../../action/orderAction.js";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader.js";
import { AccountTree } from "@mui/icons-material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstents.js";

const ProcessOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updtaeOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Sucessfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, navigate, updateError, isUpdated]);
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashBoard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>

                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === `succeeded`
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === `succeeded`
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Item:</Typography>
                  <div className="confirmCartItemContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => {
                        return (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
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
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updtaeOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value=""> Choose</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped"> Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
