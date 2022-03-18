import axios from "axios";
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_ERROR,
} from "../constants/TypeLanding";
import { BASE_URL } from "../constants/URL";

//GET NOTIFICATIONS
export const getNotifications = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/notification?page=${page}&limit=12`,

      {
        withCredentials: true,
      }
    );
    //if (refreshRes.status === 200) {
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data.notifications,
    });

    return true;
    //}
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_ERROR,
    });
    console.log(error);
    return false;
  }
};
