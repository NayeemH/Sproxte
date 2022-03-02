import axios from "axios";
import { BASE_URL } from "../constants/URL";
import { toast } from "react-toastify";
import { PROFILE_UPDATE, PROFILE_UPDATE_ERROR } from "../constants/Type";
import { getAuthUser } from "./Auth.action";

// UPDATE PROFILE ACTION
export const updateProfile = (username, address, file) => async (dispatch) => {
  let formData = new FormData();
  formData.append("name", username);
  formData.append("address", address);
  if (file) {
    formData.append("image", file);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(
      `${BASE_URL}/api/v1/profile`,
      formData,
      config
    );
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

// UPDATE PASSWORD ACTION
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
        `${BASE_URL}/api/v1/profile`,
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
