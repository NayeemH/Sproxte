import axios from "axios";
import { SET_COUNTRY, SET_STATES } from "../constants/Type";
import { countryKey } from "../constants/URL";

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
