import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import styles from "./PasswordChangeForm.module.css";
import { passwordChange } from "../../actions/Dashboard.action";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const queryString = require("query-string");

const PasswordChangeForm = ({ passwordChange }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const onSubmitHandeler = async (values) => {
    setLoading(true);
    let check = await passwordChange(values.password, parsed.email, id);
    if (check === true) {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 500);
    } else {
      setLoading(false);
    }
  };

  let initVals = {
    password: "",
    password2: "",
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Password not strong enough!"
      )
      .min(6, "Password is too short!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .required("Retype Password is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Password Change</span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="email" className="d-block">
                      Email
                    </label>
                  </div>
                  <BootstrapForm.Control
                    as={BootstrapForm.Control}
                    name="email"
                    type="email"
                    value={parsed.email}
                    disabled
                    className={`${styles.input} w-100`}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password" className="d-block">
                      Password
                    </label>
                    {errors.password && touched.password ? (
                      <small className="text-danger">{errors.password}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Create your own password"
                    name="password"
                    isValid={!errors.password && touched.password}
                    type={isPasswordVisible ? "text" : "password"}
                    className={`${styles.input} w-100 icon-hidden`}
                    isInvalid={errors.password && touched.password}
                    style={{ position: "relative" }}
                  />
                  {!isPasswordVisible ? (
                    <AiOutlineEye
                      className={styles.eyeIcon}
                      color="black"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )}
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password2" className="d-block">
                      Re-type Password
                    </label>
                    {errors.password2 && touched.password2 ? (
                      <small className="text-danger">{errors.password2}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Re-type to confirm password"
                    name="password2"
                    isValid={!errors.password2 && touched.password2}
                    type={isPasswordVisible2 ? "text" : "password"}
                    className={`${styles.input} w-100 icon-hidden`}
                    isInvalid={errors.password2 && touched.password2}
                    style={{ position: "relative" }}
                  />
                  {!isPasswordVisible2 ? (
                    <AiOutlineEye
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                    />
                  )}
                </InputGroup>
                {/* <div className={styles.req}>
                  <span className="d-block"> *Must be 6 characters long.</span>
                  <span className="d-block">
                    *Must contain one number [0-9].
                  </span>
                  <span className="d-block">
                    *Must contain one uppercase letter [A-Z].{" "}
                  </span>
                  <span className="d-block">
                    *Must contain one special character [! @ # $ % & *].
                  </span>
                </div> */}
                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Change Password"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(null, { passwordChange })(PasswordChangeForm);
