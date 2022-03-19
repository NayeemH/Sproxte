import {
  CLIENT_LIST_LOAD,
  DASHBOARD_PROJECT_LIST_GRID,
  DEVELOPER_LIST_LOAD,
  MANAGER_LIST_LOAD,
  SET_ROLE,
  SIDEBAR_TOGGLE,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/Type";
import { DELETE_USER, GET_REPORT_DATA } from "../constants/TypeLanding";

const initialState = {
  projectListGrid: "grid",
  sidebar_visible: false,
  loading: true,
  role: "",
  list: null,
  clients: null,
  report: null,
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_PROJECT_LIST_GRID:
      return {
        ...state,
        projectListGrid: payload,
        loading: false,
      };
    case SET_ROLE:
      return {
        ...state,
        role: payload,
        loading: false,
      };
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar_visible: payload,
        loading: false,
      };
    case MANAGER_LIST_LOAD:
    case DEVELOPER_LIST_LOAD:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case GET_REPORT_DATA:
      return {
        ...state,
        report: payload,
        loading: false,
      };

    case CLIENT_LIST_LOAD:
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return {
        ...state,
        role: "",
      };
    default:
      return state;
  }
};

export default dashboardReducer;
