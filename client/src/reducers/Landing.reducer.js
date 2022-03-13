import {
  CATEGORY_DELETE,
  CATEGORY_LOAD,
  DELETE_PRODUCT,
  DISCOVER_ALL,
  DISCOVER_POPULAR,
  DISCOVER_FEATURED,
  GET_LANDING_LIST,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LIST,
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
  TYPES_DELETE,
  TYPES_LOAD,
  DISCOVER_LOAD,
  PRODUCT_BY_CATEGORY,
  GET_TEMPLATE_DETAILS,
} from "../constants/TypeLanding";

const initialState = {
  sidebarActive: false,
  template: {},
  types: [],
  category: [],
  product: [],
  selected_product: {},
  selected_template: {},
  landing_list: [],
  discover_all: {},
  discover: {},
  discover_featured: {},
  discover_popular: {},
  category_products: null,
  loading: true,
};

const LandingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LANDING_SIDEBAR_TOGGLE:
      return { ...state, sidebarActive: !state.sidebarActive };

    case SELECT_TEMPLATE:
      return { ...state, template: payload, loading: false };

    case GET_LANDING_LIST:
      return { ...state, landing_list: payload, loading: false };

    case DISCOVER_ALL:
      return { ...state, discover_all: payload, loading: false };

    case DISCOVER_LOAD:
      return { ...state, discover: payload, loading: false };

    case PRODUCT_BY_CATEGORY:
      return { ...state, category_products: payload, loading: false };

    case DISCOVER_FEATURED:
      return { ...state, discover_featured: payload, loading: false };

    case DISCOVER_POPULAR:
      return { ...state, discover_popular: payload, loading: false };

    case TYPES_LOAD:
      return { ...state, types: payload, loading: false };

    case TYPES_DELETE:
      return {
        ...state,
        types: [...state.types.filter((item) => item._id !== payload)],
      };

    case GET_PRODUCT_LIST:
      return { ...state, product: payload, loading: false };

    case GET_PRODUCT_DETAILS:
      return { ...state, selected_product: payload, loading: false };

    case GET_TEMPLATE_DETAILS:
      return { ...state, selected_template: payload, loading: false };

    case CATEGORY_LOAD:
      return { ...state, category: payload, loading: false };

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
