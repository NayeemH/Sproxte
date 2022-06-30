import axios from "axios";
import { toast } from "react-toastify";
import { GET_BG_ONE, UPLOAD_BG } from "../constants/Type";
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
    const res = await axios.post(
      `${BASE_URL}/api/v1/heroImage`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: UPLOAD_BG,
    });
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
    console.log(res);
    dispatch({
      type: GET_BG_ONE,
      payload: res.data.data.image,
    });
  } catch (err) {
    console.log(err);
  }
};
