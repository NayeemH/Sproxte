import axios from "axios";
import {
  GET_SELECTED_ORDER,
  ORDER_REJECT,
  ORDER_REJECT_ERROR,
  SET_COUNTRY,
  SET_STATES,
} from "../constants/Type";
import { BASE_URL, countryKey } from "../constants/URL";

export const getCountryList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "X-CSCAPI-KEY": countryKey,
      },
    };
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries`,
      config
    );

    dispatch({
      type: SET_COUNTRY,
      payload: response.data.map((item) => {
        return { value: item.iso2, label: item.name };
      }),
    });
  } catch (err) {
    console.log(err);
  }
};
export const getStateList = (country) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "X-CSCAPI-KEY": countryKey,
      },
    };
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${country}/states`,
      config
    );

    dispatch({
      type: SET_STATES,
      payload: response.data.map((item) => {
        return { value: item.name, label: item.name };
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPaymentDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/order/${id}`);
    // console.log(res);
    dispatch({
      type: GET_SELECTED_ORDER,
      payload: { ...res.data.order },
    });
  } catch (err) {
    console.log(err);
  }
};

export const rejectOrder = (values, image, id) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("message", values.message);
    if (image) {
      formData.append("image", image);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/v1/product/gurdianReject/${id}`,
      formData,
      config
    );
    // console.log(res);
    dispatch({
      type: ORDER_REJECT,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ORDER_REJECT_ERROR,
    });
  }
};
