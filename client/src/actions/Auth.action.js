import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
} from "../constants/Type";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

//GET REFRESH TOKEN
export const getRefreshToken = () => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/v1/auth/refreshToken`,
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
    dispatch(getAuthUser());

    return true;
    //}
  } catch (error) {
    dispatch({
      type: ACCESS_TOKEN_ERROR,
      payload: error.response.data.msg[0],
    });
    toast.error(error.response.data.message);
    return false;
  }
};

//GET USER DATA ACTION
export const getAuthUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/profile`, {
      withCredentials: true,
    });
    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: AUTH_USER_LOAD_ERROR,
      payload: error.response.data.msg[0],
    });
    toast.error(error.response.data.message);
  }
};
