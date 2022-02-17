import types from "../config/ProductTypes";
import {
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
} from "../constants/TypeLanding";

const initialState = {
  sidebarActive: false,
  template: types.filter((item) => item.id === 1)[0],
};

const LandingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LANDING_SIDEBAR_TOGGLE:
      return { ...state, sidebarActive: !state.sidebarActive };
    case SELECT_TEMPLATE:
      return { ...state, template: payload };
    default:
      return state;
  }
};

export default LandingReducer;
