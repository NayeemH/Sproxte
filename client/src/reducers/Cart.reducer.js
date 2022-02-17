import {
  CART_ADD_ITEM,
  GET_PRODUCT_DETAILS,
  SET_CART_SIZE,
} from "../constants/TypeLanding";

const initialState = {
  cart: [],
  selected_cart: {},
};

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        cart: [...state.cart, payload],
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
    default:
      return state;
  }
};

export default CartReducer;
