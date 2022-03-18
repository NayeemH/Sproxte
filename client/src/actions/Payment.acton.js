import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_COMPLETED_ORDERS,
  GET_COMPLETED_ORDERS_ERROR,
  GET_RUNNING_ORDERS,
  GET_RUNNING_ORDERS_ERROR,
  ORDER_ERROR,
  ORDER_SUCCESS,
  PAYMENT_ERROR,
  SET_KEY,
  SET_TOKEN,
} from "../constants/TypeLanding";
import { BASE_URL } from "../constants/URL";

export const setPaymentKey = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/payment/publishableKey`);
    // console.log(res);
    dispatch({
      type: SET_KEY,
      payload: res.data.paymentKey,
    });
  } catch (err) {
    dispatch({ type: PAYMENT_ERROR });
    console.log(err);
  }
};

export const setPaymentToken = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/payment/paymentToken/${id}`,
      {},
      config
    );
    // :::::::::::: TODO ::::::::::::
    dispatch({
      type: SET_TOKEN,
      payload: res.data.clientSecret,
    });
  } catch (err) {
    dispatch({ type: PAYMENT_ERROR });
    console.log(err);
  }
};
// CREATE ORDER
export const createOrder = (address, phone, cart) => async (dispatch) => {
  try {
    const formData = {
      address,
      phone,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/order`,
      JSON.stringify(formData),
      config
    );
    let check = 0;
    if (res.data.orderId) {
      for (let i = 0; i < cart.length; i++) {
        let frmData = new FormData();
        let item = cart[i];

        frmData.append("type", item.type);
        if (item.type === "custom") {
          frmData.append("productTypeId", item.product._id);
        }
        if (item.type === "template") {
          frmData.append("templateId", item.product._id);
        }
        frmData.append("count", item.quantity);
        if (item.description) {
          frmData.append("description", item.description);
        }
        frmData.append("size", item.size);
        if (item.color) {
          frmData.append("color", item.color);
        }

        if (item.selectedLayout) {
          frmData.append("layoutId", item.selectedLayout);
          frmData.append("primaryText", item.mainText);
          frmData.append("primaryColor", item.mainTextColor);
          frmData.append("secondaryText", item.secondaryText);
          frmData.append("secondaryColor", item.secondaryTextColor);
        }

        if (item.images) {
          for (let i = 0; i < item.images.length; i++) {
            frmData.append("frontImages", item.images[i]);
          }
        }
        if (item.imageBack) {
          frmData.append("backImages", item.imageBack);
        }
        let configItem = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        };
        try {
          const resItem = await axios.put(
            `${BASE_URL}/api/v1/order/${res.data.orderId}`,
            frmData,
            configItem
          );
          check++;
        } catch (error) {
          toast.error("Error in creating order");
          console.log(error);
          return false;
        }
      }
    }

    if (check === cart.length) {
      toast.success("Order created successfully");
      dispatch({ type: ORDER_SUCCESS, payload: res.data.orderId });
      return true;
    }
  } catch (err) {
    dispatch({ type: ORDER_ERROR });
    console.log(err);
    return false;
  }
};

//GET RUNNING ORDERS
export const getRunningOrders = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/order/active?page=${page}&limit=12`
    );
    //console.log(res);

    dispatch({
      type: GET_RUNNING_ORDERS,
      payload: res.data.orders,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_RUNNING_ORDERS_ERROR,
    });
    console.log(err);
  }
};

//GET COMPLETED ORDERS
export const getCompletedOrders = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/order/completed?page=${page}&limit=12`
    );
    //console.log(res);

    dispatch({
      type: GET_COMPLETED_ORDERS,
      payload: res.data.orders,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_COMPLETED_ORDERS_ERROR,
    });
    console.log(err);
  }
};
