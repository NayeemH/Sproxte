import axios from "axios";
import { toast } from "react-toastify";
import {
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  EDIT_FEEDBACK_MODAL_TOGGLE,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

// DELETE FEEDBACK ACTION
export const deleteComment = (collectionId, feedbackId) => async (dispatch) => {
  const config = {
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.delete(
      `${BASE_URL}/api/project/feedback/${feedbackId}`,
      config
    );

    toast.success("Feedback deleted successfully");
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: { collectionId, feedbackId },
    });
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT_ERROR,
    });
  }
};

// FEEDBACK EDIT MODAL TOOGLE ACTION
export const toogleEditModalVisibility = (modal) => (dispatch) => {
  dispatch({
    type: EDIT_FEEDBACK_MODAL_TOGGLE,
    payload: modal,
  });
};
