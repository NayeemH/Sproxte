import axios from "axios";
import { CLIENT_MODE, COACH_MODE, COACH_MODE_ERROR } from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { getAuthUser } from "./Auth.action";

export const switchMode = (mode) => async (dispatch) => {
  if (mode === "client") {
    try {
      const refreshRes = await axios.post(
        `${BASE_URL}/api/v1/auth/switch/coach`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: COACH_MODE,
        payload: refreshRes.data.accessToken,
      });
      setAuthToken(refreshRes.data.accessToken);
      //dispatch(getAuthUser());

      return true;
    } catch (error) {
      dispatch({
        type: COACH_MODE_ERROR,
      });
    }
  } else {
    dispatch(getAuthUser());
    dispatch({
      type: CLIENT_MODE,
    });
  }
};
