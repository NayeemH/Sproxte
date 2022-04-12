import {
  SET_COUNTRY,
  SET_ORDER,
  SET_PRICE,
  SET_STATES,
} from "../constants/Type";

const initialValues = {
  country: null,
  states: null,
  order: null,
  price: null,
  loading: true,
};

const OrderReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_COUNTRY:
      return { ...state, country: payload, loading: false };
    case SET_STATES:
      return { ...state, states: payload, loading: false };
    case SET_PRICE:
      return { ...state, price: payload, loading: false };
    case SET_ORDER:
      return { ...state, order: payload, loading: false };
    default:
      return state;
  }
};

export default OrderReducer;
