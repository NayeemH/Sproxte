import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  APPROVED_PROJECT_LOAD,
  APPROVED_PROJECT_LOAD_ERROR,
  CLIENT_LIST_LOAD,
  DASHBOARD_PROJECT_LIST_GRID,
  DEVELOPER_LIST_LOAD,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  MANAGER_LIST_LOAD,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_ERROR,
  REFRESH_TOKEN_GENARATED,
  RESET_LINK_SEND,
  RESET_LINK_SEND_ERROR,
  SET_ROLE,
  SIDEBAR_TOGGLE,
} from "../constants/Type";
import { BASE_URL, PROTOCOL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

// PROJECT DISPLAY STYLE ACTION
export const toogleDashboardProjectStyle = (type) => (dispatch) => {
  dispatch({
    type: DASHBOARD_PROJECT_LIST_GRID,
    payload: type,
  });
};

// SET ROLE ACTION
export const setRole = (type) => (dispatch) => {
  dispatch({
    type: SET_ROLE,
    payload: type,
  });
};

//SIDEBAR TOOGLE ACTION
export const toogleSidebarVisibility = (type) => (dispatch) => {
  dispatch({
    type: SIDEBAR_TOGGLE,
    payload: type,
  });
};

// LOGIN ACTION
export const login = (values) => async (dispatch) => {
  let formData = {
    password: values.password,
    email: values.email,
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
      `${BASE_URL}/api/user/login`,
      JSON.stringify(formData),
      config
    );
    //console.log(res);
    if (res.status === 200) {
      dispatch({
        type: REFRESH_TOKEN_GENARATED,
      });
      try {
        const refreshRes = await axios.post(
          `${BASE_URL}/api/user/refreshToken`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (refreshRes.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: refreshRes.data.accessToken,
          });
          //console.log(res.data);
          setAuthToken(refreshRes.data.accessToken);

          toast.success("Login successfully");
          return true;
        }
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
        });
        error.response.data.msg.map((msg) => toast.error(msg));
        return false;
      }
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg[0],
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

//GET REFRESH TOKEN
export const getRefreshToken = () => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/user/refreshToken`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    //if (refreshRes.status === 200) {
    dispatch({
      type: ACCESS_TOKEN_SUCCESS,
      payload: refreshRes.data.accessToken,
    });
    setAuthToken(refreshRes.data.accessToken);

    return true;
    //}
  } catch (error) {
    dispatch({
      type: ACCESS_TOKEN_ERROR,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};

//LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/user/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (refreshRes.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      toast.success("Logout successfully");
      return true;
      //console.log(res.data);
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

//RESET PASSWORD ACTION
export const resetPassword = (email) => async (dispatch) => {
  try {
    await axios.post(
      `${BASE_URL}/api/user/resetPassword`,
      JSON.stringify({ email }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: RESET_LINK_SEND,
    });
    toast.success("Reset password link sent to your email");
    return true;
  } catch (error) {
    dispatch({
      type: RESET_LINK_SEND_ERROR,
    });
    error.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

//PASSWORD CHANGE ACTION
export const passwordChange = (password, email, id) => async (dispatch) => {
  try {
    await axios.post(
      `${BASE_URL}/api/activate/resetpassword/${id}?email=${email}`,
      JSON.stringify({ password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: PASSWORD_CHANGE,
    });
    toast.success("Password changed successfully");
    return true;
  } catch (error) {
    dispatch({
      type: PASSWORD_CHANGE_ERROR,
    });
    error.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

//GET CLIENT LIST ACTION
export const getClientList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/userInfo/client`);
    // console.log(res);

    dispatch({
      type: CLIENT_LIST_LOAD,
      payload: res.data,
    });
  } catch (err) {
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

//GET DEVELOPER LIST ACTION
export const getDevList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/userInfo/developer`);
    // console.log(res);

    dispatch({
      type: DEVELOPER_LIST_LOAD,
      payload: res.data,
    });
  } catch (err) {
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

//GET MANAGER LIST ACTION
export const getManagerList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/userInfo/manager`);
    // console.log(res);

    dispatch({
      type: MANAGER_LIST_LOAD,
      payload: res.data,
    });
  } catch (err) {
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

// FETCH PROJECTS FOR DASHBOARD
export const fetchApprovedProject = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.get(`${BASE_URL}/api/project/approved`, config);
    if (res.status === 200) {
      dispatch({
        type: APPROVED_PROJECT_LOAD,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: APPROVED_PROJECT_LOAD_ERROR,
    });
  }
};
