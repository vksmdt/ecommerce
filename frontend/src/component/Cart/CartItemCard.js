import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = (props) => {
  return (
    <div className="CartItemCart">
      <img src={props.item.image} alt="sss" />
      <div>
        <Link to={`/product/${props.item.product}`}> {props.item.name}</Link>
        <span>{`price ${props.item.price}`}</span>
        <p onClick={() => props.deleteCartItems(props.item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
