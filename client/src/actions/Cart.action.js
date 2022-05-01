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
    quantity,
    product,
    color,
    type,
    font,
    productFont,
    orderColor
  ) =>
  (dispatch) => {
    toast.success("Added to cart");
    let newDiscount = 0;
    if (
      typeof product.discount === "string" ||
      typeof product.discount === "number"
    ) {
      newDiscount = parseInt(product.discount);
    } else {
      if (product.discount.range && product.discount.range.length > 0) {
        product.discount.range.forEach((item, i) => {
          if (
            i < product.discount.range.length - 1 &&
            item <= quantity &&
            quantity <= product.discount.range[i + 1]
          ) {
            newDiscount = product.discount.discount[i + 1];
          }
          if (i == 0 && quantity <= product.discount.range[i]) {
            newDiscount = product.discount.discount[i];
          } else if (
            quantity > product.discount.range[product.discount.range.length - 1]
          ) {
            newDiscount =
              product.discount.discount[product.discount.range.length];
          }
        });
      } else {
        newDiscount = product.discount.discount[0];
      }
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
        product: { ...product, discount: newDiscount },
        color,
        type,
        font,
        productFont,
        orderColor,
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
