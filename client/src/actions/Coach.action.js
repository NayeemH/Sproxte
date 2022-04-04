import axios from "axios";
import { toast } from "react-toastify";
import { CLIENT_MODE, COACH_MODE, COACH_MODE_ERROR } from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { getAuthUser } from "./Auth.action";

export const switchMode = (mode) => async (dispatch) => {
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
      payload: { token: refreshRes.data.accessToken, role: mode },
    });
    setAuthToken(refreshRes.data.accessToken);
    dispatch(getAuthUser());
    toast.success("Switched mode successfully");
    return true;
  } catch (error) {
    dispatch({
      type: COACH_MODE_ERROR,
    });
  }
};
