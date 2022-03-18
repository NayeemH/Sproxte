import { toast } from "react-toastify";
import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  ADD_COLLECTION_ERROR,
  ADD_COLLECTION_SUCCESS,
  ADD_FAVORITE_PROJECT,
  COLLECTION_INDEX,
  COLLECTION_NEXT,
  COLLECTION_PREV,
  CREATE_TYPE_ERROR,
  CREATE_TYPE_SUCCESS,
  EDIT_FEEDBACK_ERROR,
  EDIT_FEEDBACK_SUCCESS,
  FETCH_DASHBOARD_PROJECT,
  FETCH_DASHBOARD_PROJECT_ERROR,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  GET_STEP,
  GET_STEP_ERROR,
  PROJECT_ACCEPT_EXISTING_USER,
  PROJECT_ACCEPT_EXISTING_USER_ERROR,
  PROJECT_CREATE_ERROR,
  PROJECT_CREATE_SUCCESS,
  PROJECT_INVITATION_ERROR,
  PROJECT_INVITATION_SUCCESS,
  REVIEW_ADDED,
  REVIEW_ADDED_ERROR,
  STEP_APPROVED,
  STEP_APPROVE_ERROR,
  TASK_ADDED,
  TASK_ADDED_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";
//import invited from "../stub/projects/projectDetails";
import { getRefreshToken } from "./Dashboard.action";
import {
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERRROR,
  EDIT_PRODUCT,
  EDIT_PRODUCT_ERRROR,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_ERROR,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_ERROR,
  TYPES_EDIT,
  TYPES_EDIT_ERROR,
} from "../constants/TypeLanding";
import { getTypeList } from "./Landing.action";

//GET PROJECT DETAILS WITH TASKS
export const getProjectDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/project/${id}`);
    //console.log(res);

    dispatch({
      type: GET_PROJECT_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

// SEND INVITATION LINK TO PROJECT
export const sendInvitation = (values) => async (dispatch) => {
  let formData = {
    name: values.name,
    email: values.email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/createIEP`,
      JSON.stringify(formData),
      config
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: PROJECT_INVITATION_SUCCESS,
      });
      toast.success("IEP added successfully");
      return res.data.password;
    }
  } catch (err) {
    dispatch({
      type: PROJECT_INVITATION_ERROR,
    });
    return false;
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

// CREATE ACCOUNT
export const createAccount = (values) => async (dispatch) => {
  let formData = {
    username: values.username,
    password: values.password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/activate/loginMail/notuser/${values.id}`,
      JSON.stringify(formData),
      config
    );
    if (res.status === 200) {
      dispatch({
        type: ACCOUNT_CREATE_SUCCESS,
      });
      dispatch(getRefreshToken());
      toast.success("Account created successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: ACCOUNT_CREATE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// CREATE ACCOUNT EXISTING USER
export const createAccountExisting = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/activate/loginMail/user/${id}`,
      {},
      config
    );
    if (res.status === 200) {
      dispatch({
        type: PROJECT_ACCEPT_EXISTING_USER,
      });
      toast.success("Project accepted successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: PROJECT_ACCEPT_EXISTING_USER_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// CREATE PROJECT
export const createProject =
  (values, file1, file2, file3, colors) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("productType", values.productType);
    formData.append("description", values.description);
    if (values.featured === true) {
      formData.append("featured", values.featured);
    }
    values.size
      .trim()
      .split(",")
      .map((s, i) => {
        formData.append(`sizes[${i}]`, s);
      });
    colors.map((c, i) => {
      formData.append(`colors[${i}]`, c.hex);
    });
    if (file1) {
      formData.append("pngImageFront", file1);
    }
    if (file2) {
      formData.append("pngImageBack", file2);
    }
    if (file3) {
      formData.append(`layouts`, file3);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/v1/template`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: PROJECT_CREATE_SUCCESS,
        });
        dispatch(getProjectsList());
        toast.success("Project created successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: PROJECT_CREATE_ERROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }

    return false;
  };

// EDIT PRODUCT
export const editProduct =
  (values, file1, file2, file3, colors, id) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    if (values.featured === true) {
      formData.append("featured", values.featured);
    }
    values.size
      .trim()
      .split(",")
      .map((s, i) => {
        formData.append(`sizes[${i}]`, s);
      });
    colors.map((c, i) => {
      formData.append(`colors[${i}]`, c.hex);
    });
    if (file1) {
      formData.append("pngImageFront", file1);
    }
    if (file2) {
      formData.append("pngImageBack", file2);
    }
    if (file3) {
      formData.append(`layouts`, file3);
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
        `${BASE_URL}/api/v1/template/${id}`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: EDIT_PRODUCT,
        });
        dispatch(getProjectsList());
        toast.success("Project edited successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: EDIT_PRODUCT_ERRROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }

    return false;
  };

//GET PROJECT LIST ACTION
export const getProjectsList = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/discover/all?page=1&limit=24`
    );
    // console.log(res);

    dispatch({
      type: GET_PRODUCT_LIST,
      payload: res.data.templates.items,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_LIST_ERROR,
    });
    console.log(err);
    toast.error(err.response.data.message);
  }
};

//GET Product DETAILS ACTION
export const getProductDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/template/${id}`);
    console.log(res);

    dispatch({
      type: GET_PRODUCT_DETAILS,
      payload: res.data.types,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_DETAILS_ERROR,
    });
    console.log(err);
    toast.error(err.response.data.message);
  }
};

//DELETE CATEGORY ACTION
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/template/${id}`, {
      withCredentials: true,
    });
    // console.log(res);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    toast.success("Product deleted successfully");
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_ERRROR,
    });
    toast.error(err.response.data.message);
  }
};

// CREATE PRODUCT TYPE
export const createProductType =
  (values, file, previewFile, layouts, varient) => async (dispatch) => {
    let formData = new FormData();
    //console.log(layouts);

    formData.append("name", values.name);
    formData.append("categoryType", values.categoryType);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("pngImageFront", file);

    if (previewFile) {
      formData.append("pngImageBack", previewFile);
    }
    if (layouts) {
      for (let i = 0; i < layouts.length; i++) {
        formData.append(`layouts`, layouts[i]);
      }
    }

    if (varient.length > 0) {
      for (let i = 0; i < varient.length; i++) {
        formData.append(`colors`, `#${varient[i].color.split("#")[1]}`);
        formData.append(`images`, varient[i].image);
      }
    }

    values.size
      .trim()
      .split(",")
      .map((s, i) => {
        formData.append(`sizes[${i}]`, s);
      });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/v1/type/`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: CREATE_TYPE_SUCCESS,
        });
        toast.success("Type created successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: CREATE_TYPE_ERROR,
      });
      toast.error(err.response.data.msg);
      return false;
    }

    return false;
  };

// EDIT PRODUCT TYPE
export const editProductType =
  (values, id, file, previewFile, layouts, varient) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    // formData.append("categoryType", values.categoryType);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("pngImageFront", file);

    // if (previewFile) {
    //   formData.append("pngImageBack", previewFile);
    // }
    if (layouts) {
      for (let i = 0; i < layouts.length; i++) {
        formData.append(`layouts`, layouts[i]);
      }
    }

    if (varient.length > 0) {
      for (let i = 0; i < varient.length; i++) {
        if (varient[i].color && varient[i].image) {
          formData.append(`colors`, `#${varient[i].color.split("#")[1]}`);
          formData.append(`images`, varient[i].image);
        }
      }
    }
    values.size
      .trim()
      .split(",")
      .map((s, i) => {
        formData.append(`sizes[${i}]`, s);
      });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.patch(
        `${BASE_URL}/api/v1/type/${id}`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: TYPES_EDIT,
        });
        toast.success("Type edited successfully");
        dispatch(getTypeList());
        return true;
      }
    } catch (err) {
      dispatch({
        type: TYPES_EDIT_ERROR,
      });
      toast.error(err.response.data.msg);
      return false;
    }

    return false;
  };

// FETCH PROJECTS FOR DASHBOARD
export const fetchProjects = (page) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.get(
      `${BASE_URL}/api/v1/project/active?page=${page}&limit=2`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: FETCH_DASHBOARD_PROJECT,
        payload: res.data.projects,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_DASHBOARD_PROJECT_ERROR,
    });
  }
};

// ADD FAVORITE PROJECT IN LOCAL STORAGE
export const addFavoriteProject = (id) => (dispatch) => {
  let saved = localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(" ")
    : [];
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem("fav_projects", saved.join(" "));
  }

  dispatch({
    type: ADD_FAVORITE_PROJECT,
    payload: saved,
  });
};

// REMOVE FAVORITE PROJECT IN LOCAL STORAGE
export const removeFavoriteProject = (id) => (dispatch) => {
  let saved = localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(" ")
    : [];

  localStorage.setItem(
    "fav_projects",
    saved.filter((item) => item !== id).join(" ")
  );

  dispatch({
    type: ADD_FAVORITE_PROJECT,
    payload: saved.filter((item) => item !== id).join(" "),
  });
};

// CREATE PROJECT TASK
export const createProjectTask =
  (values, file, id, steps) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    if (file) {
      formData.append("image", file);
    }
    formData.append("projectId", id);
    steps.map((step, i) => {
      formData.append(`steps[${i}]`, step.name);
      return null;
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/project/addProduct`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: TASK_ADDED,
        });
        dispatch(getProjectDetails(id));
        toast.success("Task created successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: TASK_ADDED_ERROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }

    return false;
  };

//GET STEP DATA
export const getStepDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
    //console.log(res);

    dispatch({
      type: GET_STEP,
      payload: res.data.data,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_STEP_ERROR,
    });
    console.log(err);
  }
};

// UPLOAD PROJECT STEP
export const uploadStep = (values, file, id, projectId) => async (dispatch) => {
  let formData = new FormData();

  formData.append("title", values.title);
  formData.append("image", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/product/collection/${id}`,
      formData,
      config
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: ADD_COLLECTION_SUCCESS,
      });
      dispatch(getProjectDetails(projectId));
      toast.success("Image uploaded successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: ADD_COLLECTION_ERROR,
    });
    console.log(err);
    return false;
  }

  return false;
};

export const selectedCollectionChange = (next) => (dispatch) => {
  if (next === true) {
    dispatch({
      type: COLLECTION_NEXT,
    });
  } else {
    dispatch({
      type: COLLECTION_PREV,
    });
  }
};

export const selectIndex = (index) => (dispatch) => {
  dispatch({
    type: COLLECTION_INDEX,
    payload: index,
  });
};

// APPROVE STEP
export const approveStep = (id, projectId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    await axios.patch(`${BASE_URL}/api/v1/product/approve/${id}`, {}, config);
    // console.log(res);
    dispatch({
      type: STEP_APPROVED,
    });
    dispatch(getProjectDetails(projectId));
    dispatch(getProductDetails(id));
    toast.success("Step Approved successfully");
    return true;
  } catch (err) {
    dispatch({
      type: STEP_APPROVE_ERROR,
    });
    console.log(err);
    return false;
  }
};

// POST REVIEW
export const postReview = (points, msg, stepId, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const formData = {
    message: msg,
    points: [points.x, points.y],
  };
  try {
    // TODO ::: API CALL
    await axios.put(
      `${BASE_URL}/api/v1/product/feedback/${id}`,
      JSON.stringify(formData),
      config
    );
    //console.log(res);
    dispatch({
      type: REVIEW_ADDED,
    });
    dispatch(getStepDetails(stepId));
    toast.success("Feedback added successfully");
    return true;
  } catch (err) {
    dispatch({
      type: REVIEW_ADDED_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// EDIT REVIEW
export const editReview =
  (msg, id, stepId, collectionId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const formData = {
      message: msg,
      feedbackId: id,
    };
    try {
      // TODO ::: API CALL
      await axios.patch(
        `${BASE_URL}/api/v1/product/feedback/${collectionId}`,
        JSON.stringify(formData),
        config
      );
      //console.log(res);
      dispatch({
        type: EDIT_FEEDBACK_SUCCESS,
      });
      dispatch(getStepDetails(stepId));
      toast.success("Feedback edited successfully");
      return true;
    } catch (err) {
      dispatch({
        type: EDIT_FEEDBACK_ERROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }
  };
