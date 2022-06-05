import {
  GET_SELECTED_ORDER,
  SET_COUNTRY,
  SET_ORDER,
  SET_PRICE,
  SET_STATES,
  GET_VALID_ADDRESS,
  FEDEX_TRACKING_SUCCESS,
} from "../constants/Type";
import { GET_PLAYER_REQUEST } from "../constants/TypeLanding";

const initialValues = {
  country: null,
  states: null,
  order: null,
  price: null,
  address: null,
  selected_order: null,
  player_request: null,
  tracking_info: null,
  loading: true,
};

const OrderReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYER_REQUEST:
      return { ...state, player_request: payload, loading: false };
    case SET_COUNTRY:
      return { ...state, country: payload, loading: false };
    case SET_STATES:
      return { ...state, states: payload, loading: false };
    case SET_PRICE:
      return { ...state, price: payload, loading: false };
    case SET_ORDER:
      return { ...state, order: payload, loading: false };
    case GET_SELECTED_ORDER:
      return { ...state, selected_order: payload, loading: false };
    case FEDEX_TRACKING_SUCCESS:
      return { ...state, tracking_info: payload, loading: false };
    case GET_VALID_ADDRESS:
      return {
        ...state,
        address: {
          ...payload,
          country: state.country.filter(
            (item) => item.value === payload.shippingAddress.country
          )[0].label,
          state: state.filter(
            (st) => st.value === payload.shippingAddress.state
          )[0].label,
          address: payload.shippingAddress.address[0],
          ...payload.shippingAddress,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
