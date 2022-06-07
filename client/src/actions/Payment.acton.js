import axios from "axios";
import { toast } from "react-toastify";
import {
  CLIENT_LIST_LOAD,
  DEVELOPER_LIST_LOAD,
  FEDEX_TRACKING_SUCCESS,
  GET_VALID_ADDRESS,
} from "../constants/Type";
import {
  CHANGE_STATUS,
  CHANGE_STATUS_ERROR,
  CONTACT_SUBMIT,
  CONTACT_SUBMIT_ERROR,
  GET_COMPLETED_ORDERS,
  GET_COMPLETED_ORDERS_ERROR,
  GET_CONTACT_LIST,
  GET_PLAYER_REQUEST,
  GET_PLAYER_REQUEST_ERROR,
  GET_REPORT_DATA,
  GET_RUNNING_ORDERS,
  GET_RUNNING_ORDERS_ERROR,
  ORDER_ERROR,
  ORDER_SUCCESS,
  PAYMENT_ERROR,
  SET_KEY,
  SET_TOKEN,
} from "../constants/TypeLanding";
import { BASE_URL } from "../constants/URL";
import { getProjectDetails } from "./Project.action";

export const setPaymentKey = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/payment/publishableKey`);
    // console.log(res);
    dispatch({
      type: SET_KEY,
      payload: res.data.paymentKey,
    });
  } catch (err) {
    dispatch({ type: PAYMENT_ERROR });
    console.log(err);
  }
};

export const setPaymentToken = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/payment/paymentToken/${id}`,
      {},
      config
    );
    // :::::::::::: TODO ::::::::::::
    dispatch({
      type: SET_TOKEN,
      payload: res.data.clientSecret,
    });
  } catch (err) {
    dispatch({ type: PAYMENT_ERROR });
    console.log(err);
  }
};
// CREATE ORDER
export const createOrder = (values, cart, logo, role) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("zip", values.zip);
    formData.append("country", values.country);
    formData.append("serviceType", values.method);

    if (logo) {
      formData.append("logo", logo);
      formData.append("teamName", values.teamName);
      formData.append("location", values.location);
      formData.append("color", values.color);
      formData.append("type", "team");
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const res = await axios.post(`${BASE_URL}/api/v1/order`, formData, config);
    let check = 0;
    if (res.data.orderId) {
      for (let i = 0; i < cart.length; i++) {
        let frmData = new FormData();
        let item = cart[i];
        if (logo) {
          frmData.append("type", "team");
        } else {
          frmData.append("type", item.type);
        }

        if (item.type === "custom") {
          frmData.append("productTypeId", item.product._id);
        }
        if (item.type === "template") {
          frmData.append("templateId", item.product._id);
        }
        if (item.type === "link") {
          frmData.append("productId", item.product._id);
        }
        frmData.append("count", item.quantity);
        if (item.description) {
          frmData.append("description", item.description);
        }
        frmData.append("size", item.size);
        if (item.color) {
          frmData.append("color", item.color);
        }
        if (item.productFont) {
          frmData.append("productFont", item.productFont);
        }
        if (item.orderColor) {
          frmData.append("orderColor", item.orderColor);
        }
        if (item.orderColor2) {
          frmData.append("color2", item.orderColor2);
        }

        if (item.selectedLayout) {
          frmData.append("layoutId", item.selectedLayout);
          frmData.append("primaryText", item.mainText);
          frmData.append("primaryColor", item.mainTextColor);
          frmData.append("secondaryText", item.secondaryText);
          frmData.append("secondaryColor", item.secondaryTextColor);
          frmData.append("font", item.font);
        }

        if (item.images) {
          for (let i = 0; i < item.images.length; i++) {
            frmData.append("frontImages", item.images[i]);
          }
        }
        if (item.imageBack) {
          frmData.append("backImages", item.imageBack);
        }
        let configItem = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        };
        try {
          const resItem = await axios.put(
            `${BASE_URL}/api/v1/order/${res.data.orderId}`,
            frmData,
            configItem
          );
          check++;
        } catch (error) {
          toast.error("Error in creating order");
          console.log(error);
          return false;
        }
      }
    }

    if (check === cart.length) {
      // toast.success("Order created successfully");

      const config2 = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      dispatch({ type: ORDER_SUCCESS, payload: res.data.orderId });
      try {
        const res2 = await axios.get(
          `${BASE_URL}/api/v1/shipment/${res.data.orderId}`,
          config2
        );

        // dispatch({
        //   type: GET_VALID_ADDRESS,
        //   payload: { ...res2.data, orderId: res.data.orderId },
        // });
        if (role === "admin") {
          await axios.post(
            `${BASE_URL}/api/v1/admin/order/${res.data.orderId}`,
            {},
            config2
          );
        }

        return { ...res2.data, orderId: res.data.orderId };
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  } catch (err) {
    dispatch({ type: ORDER_ERROR });
    console.log(err);
    return false;
  }
};

//GET Tracking
export const getTrackingInfo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/shipment/track/${id}`);

    dispatch({
      type: FEDEX_TRACKING_SUCCESS,
      payload: { ...res.data, orderId: id },
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

//GET RUNNING ORDERS
export const getRunningOrders = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/order/active?page=${page}&limit=12`
    );
    //console.log(res);

    dispatch({
      type: GET_RUNNING_ORDERS,
      payload: res.data.orders,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_RUNNING_ORDERS_ERROR,
    });
    console.log(err);
  }
};

//GET RUNNING PLAYER REQ
export const getPlayerRequest = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/order/player/active?page=${page}&limit=12`
    );
    //console.log(res);

    dispatch({
      type: GET_PLAYER_REQUEST,
      payload: res.data.playerAddPrice,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_PLAYER_REQUEST_ERROR,
    });
    console.log(err);
  }
};

//GET COMPLETED ORDERS
export const getCompletedOrders = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/order/completed?page=${page}&limit=12`
    );
    //console.log(res);

    dispatch({
      type: GET_COMPLETED_ORDERS,
      payload: res.data.orders,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_COMPLETED_ORDERS_ERROR,
    });
    console.log(err);
  }
};

// CHANGE STATUS
export const changeProjectStatus = (status, id) => async (dispatch) => {
  let formData = {
    status: status,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(
      `${BASE_URL}/api/v1/project/status/${id}`,
      JSON.stringify(formData),
      config
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: CHANGE_STATUS,
      });
      toast.success("Status changed successfully");
      dispatch(getProjectDetails(id));
    }
  } catch (err) {
    dispatch({
      type: CHANGE_STATUS_ERROR,
    });
  }
};

//GET USERS
export const getUserList = (page) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    const res = await axios.get(
      `${BASE_URL}/api/v1/admin/user?page=${page}&limit=12`,
      config
    );

    dispatch({
      type: CLIENT_LIST_LOAD,
      payload: res.data.users,
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

//GET IEP
export const getIepList = (page) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    const res = await axios.get(
      `${BASE_URL}/api/v1/admin/iep?page=${page}&limit=12`,
      config
    );

    dispatch({
      type: DEVELOPER_LIST_LOAD,
      payload: res.data.users,
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

//GET CONTACT LIST
export const getContactList = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/contact/?page=${page}&limit=10`
    );
    //console.log(res);

    dispatch({
      type: GET_CONTACT_LIST,
      payload: res.data.contact,
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};
//GET REPORT DATA
export const getReportData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/admin/dashboard`);
    //console.log(res);

    dispatch({
      type: GET_REPORT_DATA,
      payload: res.data.data,
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

// CONTACT SUBMITTION
export const contactFormSubmit = (values) => async (dispatch) => {
  let formData = {
    name: values.username,
    email: values.email,
    message: values.message,
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
      `${BASE_URL}/api/v1/contact/`,
      JSON.stringify(formData),
      config
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: CONTACT_SUBMIT,
      });
      toast.success("Form submitted successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: CONTACT_SUBMIT_ERROR,
    });

    return false;
  }
};
