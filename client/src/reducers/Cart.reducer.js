import { CART_RESET, RESET_CART, SET_TEAM_COUNT } from "../constants/Type";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  GET_PRODUCT_DETAILS,
  SET_CART_SIZE,
} from "../constants/TypeLanding";

const initialState = {
  cart:
    localStorage.getItem("sv_cart") &&
    JSON.parse(localStorage.getItem("sv_cart")).data
      ? JSON.parse(localStorage.getItem("sv_cart")).data
      : [],
  selected_cart: {},
  team_count: null,
};

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEAM_COUNT:
      return {
        ...state,
        team_count: payload,
      };
    case CART_ADD_ITEM:
      localStorage.setItem(
        "sv_cart",
        JSON.stringify({ data: [...state.cart, payload] })
      );
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case RESET_CART:
      localStorage.removeItem("sv_cart");
      return {
        ...state,
        cart: [],
      };
    case CART_REMOVE_ITEM:
      localStorage.setItem(
        "sv_cart",
        JSON.stringify({
          data: [...state.cart.filter((item, i) => i !== payload)],
        })
      );
      return {
        ...state,
        cart: [...state.cart.filter((item, i) => i !== payload)],
      };
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        selected_cart: { ...payload },
      };
    case SET_CART_SIZE:
      return {
        ...state,
        selected_cart: { ...state.selected_cart, size: payload },
      };
    case CART_RESET:
      return {
        ...state,
        cart: [],
        selected_cart: {},
      };
    default:
      return state;
  }
};

export default CartReducer;
