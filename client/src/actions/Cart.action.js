import {
  CART_ADD_ITEM,
  DISCOVER_ERROR,
  GET_PRODUCT_DETAILS,
  SET_CART_SIZE,
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

// SET SIZE
export const setSize = (size) => (dispatch) => {
  console.log(types);
  dispatch({
    type: SET_CART_SIZE,
    payload: size,
  });
};

// ADD TO CART
export const addToCart = (desc, size, image) => (dispatch) => {
  toast.success("Added to cart");
  console.log(image);
  dispatch({
    type: CART_ADD_ITEM,
    payload: { description: desc, size, images: image },
  });
};
