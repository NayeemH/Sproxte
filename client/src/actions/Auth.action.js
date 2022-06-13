import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
  PASSWORD_CHANGE,
  RESET_LINK_SEND,
  RESET_LINK_SEND_ERROR,
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
    if (error.response.status !== 403) {
      dispatch({
        type: ACCESS_TOKEN_ERROR,
      });
    }
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
    });
  }
};

//RESET PASSWORD SEND EMAIL ACTION
export const resetPasswordSendEmail = (values) => async (dispatch) => {
  try {
    const formData = {
      email: values.email,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/resetPassword`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success("Reset link sent successfully");

    dispatch({
      type: RESET_LINK_SEND,
    });

    return true;
    //}
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found");
    }

    dispatch({
      type: RESET_LINK_SEND_ERROR,
    });
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};
//RESET PASSWORD SEND EMAIL ACTION
export const resetPasswordLanding = (values, id) => async (dispatch) => {
  try {
    console.log("INNNN||||||||||||||");
    const formData = {
      password: values.password,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/activate/resetPassword/${id}`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Password changed successfully");

    dispatch({
      type: PASSWORD_CHANGE,
    });

    return true;
    //}
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found");
    }

    dispatch({
      type: PASSWORD_CHANGE,
    });
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};
