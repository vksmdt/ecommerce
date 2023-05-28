import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = (props) => {


  const options = {
    readOnly: true,
    precision: 0.5,
    value: props.product.ratings,

  };

  return (
    <Link className="productCard" to={`/product/${props.product._id}`}>
      <img src={props.product.images[0].url} alt={props.product.name} />
      <p>{props.product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardspan">({props.product.numOfReview} Reviews)</span>
      </div>
      <span>{`₹ ${props.product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
