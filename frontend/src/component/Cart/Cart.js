import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemsFromCart } from "../../action/cartAction.js";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stocks) => {
    const newQty = quantity + 1;
    if (stocks <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  //checkout handler
  const checkOutHandler = ()=>{
    navigate("/login?redirect=shipping")
  
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>No Product In Your Cart</Typography>
          <Link to="/products">View Product</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cardHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item, index) => {
                return (
                  <div className="cartContainer" key={index}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" readOnly value={item.quantity} />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹ ${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹ ${cartItems.reduce(
                  (acc, items) => acc + items.quantity * items.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBTn">
                <button onClick={checkOutHandler}> Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
