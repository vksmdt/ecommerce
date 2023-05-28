import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../action/productAction.js";
import Loader from "../layout/loader/Loader.js";
import ProductCard from "../home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
// import {  Slider } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";

// category array

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smartphone",
];

const Products = () => {
  const dispatch = useDispatch();

  // alert
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  // const [ratings, setRatings] = useState(0);

  // category state
  const [category, setCategory] = useState("");

  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
          </div>

          <div className="filterBox">
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              <li
                className="category-link"
                onClick={() => dispatch(getProduct())}
              >
                All Products
              </li>
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
            {/* <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset> */}
          </div>

          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
