import {
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
} from "../constants/TypeLanding";

export const toggleLandingSidebar = () => (dispatch) => {
  dispatch({
    type: LANDING_SIDEBAR_TOGGLE,
  });
};

export const setSelectedTemplate = (temp) => (dispatch) => {
  dispatch({
    type: SELECT_TEMPLATE,
    payload: temp,
  });
};
