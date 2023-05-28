import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProdutReducer,
  newReviewReducer,
  productDetailsReducers,
  productReducer,
  productReviewsReducers,
  productsReducers,
  reviewReducer,
} from "./reducers/productReducer.js";
import {
  profileReducers,
  userReducers,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer.js";
import { cartReducers } from "./reducers/cartReducer.js";
import {
  allOrdersReducer,
  myOrderReducer,
  newOrderREducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer.js";

const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducers,
  user: userReducers,
  profile: profileReducers,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducers,
  newOrder: newOrderREducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProdutReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducers,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
