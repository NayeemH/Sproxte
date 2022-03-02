import axios from "axios";
import { toast } from "react-toastify";
import {
  CATEGORY_DELETE,
  CATEGORY_DELETE_ERROR,
  CATEGORY_EDIT,
  CATEGORY_EDIT_ERROR,
  CATEGORY_LOAD,
  CATEGORY_LOAD_ERROR,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
} from "../constants/TypeLanding";
import { BASE_URL } from "../constants/URL";

// CREATE PRODUCT TYPE
export const createProductCategory =
  (values, file, previewFile) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("pngImage", file);
    formData.append("svgImage", previewFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/v1/category`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: CREATE_CATEGORY_SUCCESS,
        });
        toast.success("Category created successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: CREATE_CATEGORY_ERROR,
      });
      toast.error(err.response.data.msg);
      return false;
    }

    return false;
  };

//GET CATEGORY LIST ACTION
export const getCategoryList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/category`);
    // console.log(res);

    dispatch({
      type: CATEGORY_LOAD,
      payload: res.data.types,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_LOAD_ERROR,
    });
    console.log(err);
    toast.error(err.response.data.message);
  }
};

//DELETE CATEGORY ACTION
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/category/${id}`, {
      withCredentials: true,
    });
    // console.log(res);
    dispatch({
      type: CATEGORY_DELETE,
      payload: id,
    });
    toast.success("Category deleted successfully");
  } catch (err) {
    dispatch({
      type: CATEGORY_DELETE_ERROR,
    });
    toast.error(err.response.data.message);
  }
};

// EDIT PRODUCT CATEGORY
export const editProductCategory =
  (values, id, file, previewFile) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    if (file) {
      formData.append("pngImage", file);
    }
    if (previewFile) {
      formData.append("svgImage", previewFile);
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
        `${BASE_URL}/api/v1/category/${id}`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: CATEGORY_EDIT,
        });
        toast.success("Category edited successfully");
        dispatch(getCategoryList());
        return true;
      }
    } catch (err) {
      dispatch({
        type: CATEGORY_EDIT_ERROR,
      });
      toast.error(err.response.data.msg);
      return false;
    }

    return false;
  };
