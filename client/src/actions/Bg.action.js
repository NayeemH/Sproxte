import axios from "axios";
import { toast } from "react-toastify";
import { GET_BG, GET_BG_ONE, UPLOAD_BG } from "../constants/Type";
import { BASE_URL } from "../constants/URL";

export const uploadBg = (files) => async (dispatch) => {
  console.log("Innn");
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    await axios.post(`${BASE_URL}/api/v1/heroImage`, formData, config);
    dispatch({
      type: UPLOAD_BG,
    });
    dispatch(getBgList());
    toast.success("Background uploaded successfully");
    return true;
  } catch (err) {
    console.log(err);
    toast.error("Error uploading background");
    return false;
  }
};

// get bg one
export const getBgOne = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/heroImage`);

    dispatch({
      type: GET_BG_ONE,
      payload: res.data.data.image,
    });
  } catch (err) {
    console.log(err);
  }
};

// get bg list
export const getBgList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/heroImage/all`);

    dispatch({
      type: GET_BG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
