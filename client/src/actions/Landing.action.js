import {
  LANDING_SIDEBAR_TOGGLE,
  SELECT_TEMPLATE,
  TYPES_DELETE,
  TYPES_DELETE_ERROR,
  TYPES_LOAD,
  TYPES_LOAD_ERROR,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTER,
  USER_REGISTER_ERROR,
} from "../constants/TypeLanding";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Auth.action";

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
      dispatch(getRefreshToken());
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
      dispatch(getRefreshToken());
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

//GET Type LIST ACTION
export const getTypeList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/type/`);
    // console.log(res);

    dispatch({
      type: TYPES_LOAD,
      payload: res.data.types,
    });
  } catch (err) {
    dispatch({
      type: TYPES_LOAD_ERROR,
    });
    toast.error(err.response.data.message);
  }
};

//DELETE TYPE ACTION
export const deleteType = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/type/${id}`, {
      withCredentials: true,
    });
    // console.log(res);
    dispatch({
      type: TYPES_DELETE,
      payload: id,
    });
    toast.success("Type deleted successfully");
  } catch (err) {
    dispatch({
      type: TYPES_DELETE_ERROR,
    });
    toast.error(err.response.data.message);
  }
};
