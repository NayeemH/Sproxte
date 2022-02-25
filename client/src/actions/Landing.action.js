import {
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTER,
  USER_REGISTER_ERROR,
} from "../constants/TypeLanding";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/URL";

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

// REGISTER USER ACTION
export const createUserAccount = (values) => async (dispatch) => {
  let formData = {
    name: values.username,
    email: values.email,
    password: values.password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/signup`,
      JSON.stringify(formData),
      config
    );
    if (res.status === 200) {
      dispatch({
        type: USER_REGISTER,
      });
      toast.success("User registered successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: USER_REGISTER_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// LOGIN USER ACTION
export const loginUserAccount = (values) => async (dispatch) => {
  let formData = {
    email: values.email,
    password: values.password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      JSON.stringify(formData),
      config
    );
    if (res.status === 200) {
      dispatch({
        type: USER_LOGIN,
      });
      toast.success("User logged in successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: USER_LOGIN_ERROR,
    });
    toast.error(err.response.data.message);
    return false;
  }
};
