// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/header/Header.js";
import Contact from "./component/layout/contact/Contact.js";
import About from "./component/layout/about/About.js";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/home/Home.js";
import PageNotFound from "./component/layout/notFound/PageNotFound.js";
import ProductDeatails from "./component/product/ProductDeatails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignUp from "./component/user/LoginSignUp.js";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import { loadUser } from "./action/userAction.js";
import ProtectiveRoute from "./component/route/ProtectiveRoute.js";
import AdminRoute from "./component/route/AdminRoute.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Payment from "./component/Cart/Payment.js";
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails.js";
import DashBoard from "./component/Admin/DashBoard.js";
import ProductList from "./component/Admin/ProductList.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserOption from "./component/layout/header/UserOption.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";

function App() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // receved stripe payment api key
  const [stripeApiKey, setStripeApiKey] = useState(``);

  const stripePromise = loadStripe(stripeApiKey);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/product/:id" element={<ProductDeatails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />

          {/* ProtectiveRoute */}

          <Route
            element={loading === false && <ProtectiveRoute isAdmin={true} />}
          >
            <Route path="/account" element={<Profile />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<UpdatePassword />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />
            {stripeApiKey && (
              <Route
                exact
                path="/process/payment"
                element={
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                }
              />
            )}
          </Route>

          {/* // admin routes */}

          <Route element={loading === false && <AdminRoute isAdmin={true} />}>
            <Route exact path="/admin/dashboard" element={<DashBoard />} />
            <Route exact path="/admin/products" element={<ProductList />} />
            <Route exact path="/admin/product" element={<NewProduct />} />
            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
            <Route exact path="/admin/orders" element={<OrderList />} />
            <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
            <Route exact path="/admin/users" element={<UserList />} />
            <Route exact path="/admin/user/:id" element={<UpdateUser />} />
            <Route exact path="/admin/reviews" element={<ProductReviews />} />
          </Route>

          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="*" element={<PageNotFound />} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
