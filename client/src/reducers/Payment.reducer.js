import {
  GET_COMPLETED_ORDERS,
  GET_CONTACT_LIST,
  GET_RUNNING_ORDERS,
  ORDER_SUCCESS,
  SET_KEY,
  SET_TOKEN,
} from "../constants/TypeLanding";

const initialValue = {
  key: "",
  token: "",
  id: "",
  running_orders: null,
  completed_orders: null,
  contact: null,
  loading: true,
};

const paymentReducer = (state = initialValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_KEY:
      return {
        ...state,
        key: payload,
        loading: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
        loading: false,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        id: payload,
        loading: false,
      };
    case GET_RUNNING_ORDERS:
      return {
        ...state,
        running_orders: payload,
        loading: false,
      };
    case GET_COMPLETED_ORDERS:
      return {
        ...state,
        completed_orders: payload,
        loading: false,
      };
    case GET_CONTACT_LIST:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentReducer;
