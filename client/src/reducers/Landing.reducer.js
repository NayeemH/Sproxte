import types from "../config/ProductTypes";
import {
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
  TYPES_DELETE,
  TYPES_LOAD,
} from "../constants/TypeLanding";

const initialState = {
  sidebarActive: false,
  template: types.filter((item) => item.id === 1)[0],
  types: [],
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
    default:
      return state;
  }
};

export default LandingReducer;
