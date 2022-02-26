import axios from "axios";
import { BASE_URL } from "../constants/URL";
import { toast } from "react-toastify";
import {
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
  PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
} from "../constants/Type";

//GET USER DATA ACTION
export const getAuthUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/profile/`, {
      withCredentials: true,
    });
    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_USER_LOAD_ERROR,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => console.log(msg));
  }
};

// UPDATE PROFILE ACTION
export const updateProfile = (username, file) => async (dispatch) => {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("image", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(`${BASE_URL}/api/profile/`, formData, config);
    if (res.status === 200) {
      dispatch({
        type: PROFILE_UPDATE,
      });
      toast.success("Profile Updated Successfully");
      dispatch(getAuthUser());
      return true;
    }
  } catch (err) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }

  return false;
};

// UPDATE PROFILE ACTION
export const updatePasswordProfile =
  (password, newPassword) => async (dispatch) => {
    let formData = new FormData();
    formData.append("password", password);
    formData.append("newPassword", newPassword);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.patch(
        `${BASE_URL}/api/profile/`,
        formData,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: PROFILE_UPDATE,
        });
        toast.success("Password Changed Successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: PROFILE_UPDATE_ERROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }

    return false;
  };
