import {
  DISCOVER_ALL,
  DISCOVER_ERROR,
  DISCOVER_FEATURED,
  DISCOVER_LOAD,
  DISCOVER_POPULAR,
  GET_LANDING_DATA,
  GET_LANDING_LIST,
  LANDING_SIDEBAR_TOGGLE,
  PRODUCT_BY_CATEGORY,
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

//GET LANDING DATA NEW UI
export const getLandingData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/type/categoryAll/`);
    // console.log(res);

    dispatch({
      type: GET_LANDING_DATA,
      payload: res.data.finalData,
    });
  } catch (err) {
    dispatch({
      type: TYPES_LOAD_ERROR,
    });
    console.log(err);
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
    console.log(err);
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

//GET LANDING LIST
export const getLandingList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/discover/all`);
    // console.log(res);

    dispatch({
      type: GET_LANDING_LIST,
      payload: res.data.templates.items,
    });
  } catch (err) {
    console.log(err);
  }
};

//GET Type LIST ACTION
export const getDiscover = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/discover/`);
    //console.log(res);
    dispatch({
      type: DISCOVER_LOAD,
      payload: res.data.templates,
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};
//GET POPULAR LIST ACTION
export const getPopular = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/discover/popular?page=${page}&limit=12`
    );
    // console.log(res);
    dispatch({
      type: DISCOVER_POPULAR,
      payload: res.data.popularTemplates,
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};

//GET FEATURE LIST ACTION
export const getFeature = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/discover/feature?page=${page}&limit=12`
    );
    // console.log(res);
    dispatch({
      type: DISCOVER_FEATURED,
      payload: res.data.featureTemplates,
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};

//GET ALL LIST ACTION
export const getAll = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/discover/all?page=${page}&limit=12`
    );
    // console.log(res);
    dispatch({
      type: DISCOVER_ALL,
      payload: res.data.templates,
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};

//GET CATEGORY LIST ACTION
export const getCategoryProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/type/category/${id}`);
    // console.log(res);
    dispatch({
      type: PRODUCT_BY_CATEGORY,
      payload: res.data.types,
    });
  } catch (err) {
    dispatch({ type: DISCOVER_ERROR });
    console.log(err);
  }
};
