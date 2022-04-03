import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  DISCOVER_ERROR,
  GET_PRODUCT_DETAILS,
  GET_TEMPLATE_DETAILS,
  SET_CART_SIZE,
  TEMPLATE_ERROR,
} from "../constants/TypeLanding";
import types from "../config/ProductTypes";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/URL";
import axios from "axios";

// GET PRODUCT
export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/type/${id}`);
    // console.log(res);
    dispatch({
      type: GET_PRODUCT_DETAILS,
      payload: { ...res.data.types },
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};

// GET TEMPLATE
export const getTemplate = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/template/${id}`);
    // console.log(res);
    dispatch({
      type: GET_TEMPLATE_DETAILS,
      payload: { ...res.data.types },
    });
  } catch (err) {
    dispatch({ type: TEMPLATE_ERROR });
    console.log(err);
  }
};

// SET SIZE
export const setSize = (size) => (dispatch) => {
  console.log(types);
  dispatch({
    type: SET_CART_SIZE,
    payload: size,
  });
};

// ADD TO CART
export const addToCart =
  (
    desc,
    size,
    image,
    selectedFileBack,
    mainText,
    secondaryText,
    mainTextColor,
    secondaryTextColor,
    selectedLayout,
    quantity,
    product,
    color,
    type,
    font
  ) =>
  (dispatch) => {
    toast.success("Added to cart");
    console.log(image);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        description: desc,
        size,
        images: image,
        imageBack: selectedFileBack,
        mainText,
        mainTextColor,
        secondaryText,
        secondaryTextColor,
        selectedLayout,
        quantity,
        product,
        color,
        type,
        font,
      },
    });
  };

export const removeFromCart = (id) => (dispatch) => {
  console.log(id);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
