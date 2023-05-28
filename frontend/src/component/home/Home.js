import React, { useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
import { CgMouse } from "@react-icons/all-files/cg/CgMouse.js"
import "./Home.css";
// import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { clearError, getProduct } from "../../action/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome To Ecommerce Web Application</p>
            <h1>Find amazing Product Below</h1>
            <a href="#homeHeading">
              <button>
                scroll <CgMouse/>
              </button>
            </a>
          </div>

          <h2 className="homeHeading" id="homeHeading">
            {" "}
            Feature Product
          </h2>
          <div className="container">
            {products &&
              products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
