import { ORDER_SUCCESS, SET_KEY, SET_TOKEN } from "../constants/TypeLanding";

const initialValue = {
  key: "",
  token: "",
  id: "",
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
    default:
      return state;
  }
};

export default paymentReducer;
