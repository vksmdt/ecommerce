import React, { Fragment, useEffect, useState } from "react";
// import Carousel from 'react-material-ui-carousel'
import { Carousel } from "react-responsive-carousel";
// import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import "./productdetails.css";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../action/productAction.js";
import { useParams } from "react-router-dom";
import ReviewCArd from "./ReviewCArd.js";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import { addItemToCart } from "../../action/cartAction.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstents.js";

const ProductDeatails = () => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  const options = {
    size: "large",
    value: Number(product.ratings),
    readOnly: true,
    precision: 0.5,
  };


  // use pramas hook id match react router hook
  const { id } = useParams();
  // console.log(id);

  //usestate
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // submit review function
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  // review submit function
  const reviewSubmitHandle = () => {
    const myform = new FormData();
    myform.set("rating", Number(rating));
    myform.set("comment", comment);
    myform.set("productId", id);
    dispatch(newReview(myform));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Succesfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="productdeatails">
            <div>
              <Carousel>
                {/* <Carousel.Item> */}
                {product.images &&
                  product.images.map((item, index) => (
                    <img
                      className="CarouselImage"
                      key={index}
                      src={item.url}
                      alt={`${index}Slide`}
                    />
                  ))}
                {/* </Carousel.Item> */}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">{`(${product.numOfReview} Reviews)`}</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}> - </button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}> + </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
                <p>
                  Status :{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading"> REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextAria"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandle} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, index) => (
                  <ReviewCArd key={index} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReview">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </>
  );
};

export default ProductDeatails;
