import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { InputGroup, Form as BootstrapForm, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/Payment.acton";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import colors from "../../config/Colors";
import { toast } from "react-toastify";
import { getCountryList, getStateList } from "../../actions/Order.action";
import { Select, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import methods from "../../constants/fedexMethods";

const CardForm = ({
  cart,
  createOrder,
  user,
  country,
  states,
  getCountryList,
  getStateList,
  address,
  total,
}) => {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(undefined);
  const navigate = useNavigate();
  const modals = useModals();
  useEffect(() => {
    if (!country) {
      getCountryList();
    }
  }, []);

  const onClickHandeler = (values) => {
    if (!user) {
      modals.openConfirmModal({
        title: "Login Required",
        centered: true,
        children: (
          <Text size="md">
            <b>Note:</b> You need to login to place an order.
          </Text>
        ),
        labels: { confirm: "Login", cancel: "Cancel" },
        onCancel: () => {},
        onConfirm: () => navigate("/login"),
      });
    } else {
      onSubmitHandeler(values);
    }
    // modals.openConfirmModal({
    //   title: "You Pay Before Approving The Design",
    //   centered: true,
    //   children: (
    //     <Text size="md">
    //       <b>Note:</b> You pay before approving the design.
    //     </Text>
    //   ),
    //   labels: { confirm: "Checkout", cancel: "Cancel" },
    //   confirmProps: { color: "red" },
    //   onCancel: () => {},
    //   onConfirm: () => onSubmitHandeler(values),
    // });
  };

  const onSelectFile = (e) => {
    if (e.target.files.length > 0) {
      // Check file size under 2MB
      if (e.target.files[0].size < 2097152) {
        setLogo(e.target.files[0]);
      } else {
        setLogo(undefined);
        toast.error("File size must be less than 2MB");
      }
    } else {
      setLogo(undefined);
    }
  };

  const onSubmitHandeler = async (values) => {
    setLoading(true);
    if (user.userType === "coach") {
      if (!logo) {
        toast.error("Please upload a logo");
        return false;
      }
      if (!values.teamName || !values.teamName.trim()) {
        toast.error("Please enter a team name");
        return false;
      }
      if (!values.location || !values.location.trim()) {
        toast.error("Please enter a team location");
        return false;
      }
      if (
        !values.color ||
        !values.color.trim() ||
        values.color === "" ||
        values.color === "none"
      ) {
        toast.error("Please enter a team color");
        return false;
      }
    }
    let check =
      user.userType === "coach"
        ? await createOrder(values, cart, logo)
        : await createOrder(values, cart, undefined, user.userType);
    if (check !== false) {
      setLoading(false);
      // FILLED ADDRESS
      modals.openConfirmModal({
        title: "Your Address",
        centered: true,
        closeOnClickOutside: false,
        children: (
          <Text size="md">
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Address</span>
              </div>
              <span className="d-block">
                {check.shippingAddress.address &&
                  check.shippingAddress.address[0]}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Postal Code</span>
              </div>
              <span className="d-block">
                {check.shippingAddress && check.shippingAddress.zip}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">City</span>
              </div>
              <span className="d-block">
                {check.shippingAddress.city && check.shippingAddress.city}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">State</span>
              </div>
              <span className="d-block">
                {check.shippingAddress.state && check.shippingAddress.state}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Country</span>
              </div>
              <span className="d-block">
                {check.shippingAddress.country && check.shippingAddress.country}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Shipping Type</span>
              </div>
              <span className="d-block">
                {check.serviceType && check.serviceType}
              </span>
            </div>
            <b>Note:</b> This address is auto corrected.
            <hr />
            <h4>Price</h4>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Subtotal</span>
              </div>
              <span className="d-block">${total && total}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Shipping Cost</span>
              </div>
              <span className="d-block">
                $
                {check.shippingRate.price &&
                  check.shippingRate.price.toFixed(2)}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom fs-4 py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block fw-bold ms-1">Total Price</span>
              </div>
              <span className="d-block">
                $
                {check.shippingRate.price && total
                  ? (check.shippingRate.price + total).toFixed(2)
                  : "Invalid Price"}
              </span>
            </div>
          </Text>
        ),
        labels: {
          confirm: `${
            user && user.userType === "admin" ? "Invoice" : "Checkout"
          }`,
          cancel: "Cancel",
        },
        confirmProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () =>
          user && user.userType === "admin"
            ? navigate(`/admin/order/${check.orderId}`)
            : navigate(`/payment/${check.orderId}`),
      });
    } else {
      setLoading(false);
    }
    setLoading(false);
    return true;
  };

  const initialValues = {
    address: "",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    teamName: "",
    location: "",
    color: "",
    method: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Provide valid email"
      )
      .required("Email is required!"),
    address: Yup.string().required("Address is required!"),
    phone: Yup.string()
      .max(10, "Maximum 10 digit allowed")
      .min(10, "Minimum 10 digit allowed")
      .required("Phone is required!"),
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    zip: Yup.string().required("Zip is required!"),
    country: Yup.string().required("Country is required!"),
    method: Yup.string().required("Delivery method is required!"),
    color: Yup.string()
      .test("Is selected?", "Please select a color", (val) => {
        return val !== "none" || user.userType === "coach";
      })
      .notRequired(),
    teamName: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        enableReinitialize
        onSubmit={(values) => onClickHandeler(values)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="phone" className="d-block">
                  Phone Number
                </label>
                {errors.phone && touched.phone ? (
                  <small className="text-danger pt-2">{errors.phone}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Phone "
                name="phone"
                isValid={!errors.phone && touched.phone}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.phone && touched.phone}
              />
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="email" className="d-block">
                  Email
                </label>
                {errors.email && touched.email ? (
                  <small className="text-danger pt-2">{errors.email}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type email "
                name="email"
                isValid={!errors.email && touched.email}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.email && touched.email}
              />
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="firstName" className="d-block">
                  First Name
                </label>
                {errors.firstName && touched.firstName ? (
                  <small className="text-danger pt-2">{errors.firstName}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type first name "
                name="firstName"
                isValid={!errors.firstName && touched.firstName}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.firstName && touched.firstName}
              />
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="lastName" className="d-block">
                  Last Name
                </label>
                {errors.lastName && touched.lastName ? (
                  <small className="text-danger pt-2">{errors.lastName}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type last name "
                name="lastName"
                isValid={!errors.lastName && touched.lastName}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.lastName && touched.lastName}
              />
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="address" className="d-block">
                  Street Lines
                </label>
                {errors.address && touched.address ? (
                  <small className="text-danger pt-2">{errors.address}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type street lines... "
                name="address"
                isValid={!errors.address && touched.address}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.address && touched.address}
              />
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="city" className="d-block">
                  City
                </label>
                {errors.city && touched.city ? (
                  <small className="text-danger pt-2">{errors.city}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type City "
                name="city"
                isValid={!errors.city && touched.city}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.city && touched.city}
              />
            </InputGroup>
            {country && (
              <>
                <span className="d-block text-start pb-2">Country</span>
                <Select
                  searchable
                  placeholder="Select Country"
                  required
                  value={values.country}
                  onChange={(e) => {
                    getStateList(e);
                    setFieldValue("country", e);
                    setFieldValue("state", "");
                  }}
                  data={country}
                />
              </>
            )}
            {states && values.country && (
              <>
                <span className="d-block text-start pb-2 pt-3">State</span>
                <Select
                  searchable
                  placeholder="Select State"
                  required
                  value={values.state}
                  onChange={(e) => {
                    setFieldValue("state", e);
                  }}
                  data={states}
                  className="mb-3"
                />
              </>
            )}

            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="zip" className="d-block">
                  Postal Code
                </label>
                {errors.zip && touched.zip ? (
                  <small className="text-danger pt-2">{errors.zip}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type postal code..."
                name="zip"
                isValid={!errors.zip && touched.zip}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.zip && touched.zip}
              />
            </InputGroup>
            <span className="d-block text-start pb-2">Delivery Type</span>
            <Select
              placeholder="Select delivery type"
              required
              value={values.method}
              onChange={(e) => {
                setFieldValue("method", e);
              }}
              data={methods}
            />
            {user && user.userType === "coach" ? (
              <>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="teamName" className="d-block">
                      Team Name
                    </label>
                    {errors.teamName && touched.teamName ? (
                      <small className="text-danger pt-2">
                        {errors.teamName}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type team name"
                    name="teamName"
                    isValid={!errors.teamName && touched.teamName}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.teamName && touched.teamName}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="location" className="d-block">
                      Team Location
                    </label>
                    {errors.location && touched.location ? (
                      <small className="text-danger pt-2">
                        {errors.location}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type team name"
                    name="location"
                    isValid={!errors.location && touched.location}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.location && touched.location}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="logo" className="d-block">
                      Team Logo
                    </label>
                    {errors.location && touched.location ? (
                      <small className="text-danger pt-2">
                        {errors.location}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    name="logo"
                    type="file"
                    onChange={(e) => onSelectFile(e)}
                    required
                    className={`${styles.input} w-100`}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="color" className="d-block">
                      Team color
                    </label>
                    {errors.color && touched.color ? (
                      <small className="text-danger pt-2">{errors.color}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Select}
                    placeholder="Type team name"
                    name="color"
                    isValid={!errors.color && touched.color}
                    className={`${styles.input} w-100`}
                    isInvalid={errors.color && touched.color}
                    required
                  >
                    <option value="none" selected>
                      Select Color
                    </option>
                    {colors.map((clr, i) => (
                      <option key={i} value={clr.name}>
                        {clr.name}
                      </option>
                    ))}
                  </Field>
                </InputGroup>
              </>
            ) : null}

            <div className="pt-3">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className={`btn_primary`}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  country: state.order.country,
  states: state.order.states,
  address: state.order.address,
});

export default connect(mapStateToProps, {
  createOrder,
  getCountryList,
  getStateList,
})(CardForm);
