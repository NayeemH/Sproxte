import types from "../config/ProductTypes";
import {
  CATEGORY_DELETE,
  CATEGORY_LOAD,
  DELETE_PRODUCT,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LIST,
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
  TYPES_DELETE,
  TYPES_LOAD,
} from "../constants/TypeLanding";

const initialState = {
  sidebarActive: false,
  template: types.filter((item) => item.id === 1)[0],
  types: [],
  category: [],
  product: [],
  selected_product: {},
};

const LandingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LANDING_SIDEBAR_TOGGLE:
      return { ...state, sidebarActive: !state.sidebarActive };

    case SELECT_TEMPLATE:
      return { ...state, template: payload };

    case TYPES_LOAD:
      return { ...state, types: payload };

    case TYPES_DELETE:
      return {
        ...state,
        types: [...state.types.filter((item) => item._id !== payload)],
      };

    case GET_PRODUCT_LIST:
      return { ...state, product: payload };

    case GET_PRODUCT_DETAILS:
      return { ...state, selected_product: payload };

    case CATEGORY_LOAD:
      return { ...state, category: payload };

    case CATEGORY_DELETE:
      return {
        ...state,
        category: [...state.category.filter((item) => item._id !== payload)],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: [...state.product.filter((item) => item._id !== payload)],
      };

    default:
      return state;
  }
};

export default LandingReducer;
