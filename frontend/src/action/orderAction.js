import axios from "axios";
import {
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../constants/orderConstents.js";

//create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json ",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// my order acction
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all orders(ADMIN)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json ",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get order details action
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
