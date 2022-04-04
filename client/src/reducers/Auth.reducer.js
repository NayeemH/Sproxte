import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
  AUTH_USER_LOAD,
  COACH_MODE,
  CLIENT_MODE,
} from "../constants/Type";
import { GET_NOTIFICATIONS } from "../constants/TypeLanding";

const initialState = {
  token: "",
  isAuthenticated: false,
  user: null,
  loading: true,
  notifications: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload,
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        err: action.payload,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_USER_LOAD:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case COACH_MODE:
      return {
        ...state,
        token: action.payload,
        loading: false,
        user: { ...state.user, userType: "coach" },
      };
    case CLIENT_MODE:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        user: {
          ...state.user,
          userType: action.payload.role,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
