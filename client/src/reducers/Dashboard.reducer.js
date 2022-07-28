import {
  CLIENT_LIST_LOAD,
  DASHBOARD_PROJECT_LIST_GRID,
  DEVELOPER_LIST_LOAD,
  MANAGER_LIST_LOAD,
  SET_ROLE,
  SIDEBAR_TOGGLE,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_IEP_INVOICE_DATA,
  GET_UPLOADS,
  DELETE_UPLOADS,
} from "../constants/Type";
import { GET_REPORT_DATA } from "../constants/TypeLanding";

const initialState = {
  projectListGrid: "grid",
  sidebar_visible: false,
  loading: true,
  role: "",
  list: null,
  clients: null,
  report: null,
  iep_invoice: null,
  files: null,
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
    case GET_UPLOADS:
      return {
        ...state,
        files: payload,
        loading: false,
      };
    case DELETE_UPLOADS:
      return {
        ...state,
        files: state.files.filter((item) => item._id !== payload),
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
    case GET_IEP_INVOICE_DATA:
      return {
        ...state,
        iep_invoice: payload,
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
