import {
  CART_ADD_ITEM,
  GET_PRODUCT_DETAILS,
  SET_CART_SIZE,
} from "../constants/TypeLanding";
import types from "../config/ProductTypes";
import { toast } from "react-toastify";

// GET PRODUCT
export const getProduct = (id) => (dispatch) => {
  console.log(types);
  dispatch({
    type: GET_PRODUCT_DETAILS,
    payload: { ...types.filter((item) => item.id.toString() === id)[0] },
  });
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
