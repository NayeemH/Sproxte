import axios from "axios";
import { toast } from "react-toastify";
import {
  CART_RESET,
  COACH_MODE,
  COACH_MODE_ERROR,
  SET_TEAM_COUNT,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { getAuthUser } from "./Auth.action";

export const switchMode = (mode) => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/v1/auth/switch/${mode}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: CART_RESET,
    });
    dispatch({
      type: COACH_MODE,
      payload: { token: refreshRes.data.accessToken },
    });
    toast.success("Switched mode successfully");
    setAuthToken(refreshRes.data.accessToken);

    dispatch(getAuthUser());

    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: COACH_MODE_ERROR,
    });
  }
};

export const setTeamCount = (teamCount) => (dispatch) => {
  dispatch({
    type: SET_TEAM_COUNT,
    payload: teamCount,
  });
};
