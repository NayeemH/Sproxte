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
import { getPrice } from "../utils/getPrice";
import { getDiscount } from "../utils/getDiscount";
import { RESET_CART } from "../constants/Type";

// clearCart

export const clearCart = () => (dispatch) => {
  dispatch({
    type: RESET_CART,
  });
};

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

// GET TEMPLATE
export const getTemplateShare = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/share/${id}`);
    console.log(res);
    dispatch({
      type: GET_TEMPLATE_DETAILS,
      payload: res.data.data,
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
    quantityRaw,
    product,
    color,
    type,
    font,
    productFont,
    orderColor,
    orderColor2,
    selectedFont
  ) =>
  (dispatch) => {
    toast.success("Added to cart");
    let newDiscount = 0;
    let newPrice = 0;
    let quantity = parseInt(quantityRaw);
    newPrice = getPrice(product.priceArray, parseInt(quantity));
    newDiscount = getDiscount(product.discount, parseInt(quantity));

    if (orderColor2) {
      orderColor2 = orderColor2.join(",");
    }

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
        product: { ...product, discount: newDiscount, price: newPrice },
        color,
        type,
        font,
        productFont,
        orderColor,
        orderColor2,
        selectedFont,
      },
    });
  };

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
