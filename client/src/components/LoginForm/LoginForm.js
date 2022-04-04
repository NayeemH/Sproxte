import React, { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./LoginForm.module.scss";
import { loginUserAccount } from "../../actions/Landing.action";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ loginUserAccount, isAuthenticated }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: create account action
    let check = await loginUserAccount(values);
    if (check === true) {
      setTimeout(() => {
        navigate("/dashboard");
        setSubmitting(false);
      }, 500);
    } else {
      setSubmitting(false);
    }
  };
  let initVals = {
    email: "",
    type: "indevidual",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email!"
      )
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      //   "Password not strong enough!"
      // )
      .min(6, "Password is too short!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card className={`${styles.crd} shadow `}>
        <Card.Header className="d-flex justify-content-center align-items-center bg-dark">
          <span className={`${styles.heading} fw-bold gradient_title`}>
            Login
          </span>
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
                    {errors.email && touched.email ? (
                      <small className="text-danger pt-2">{errors.email}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your email"
                    name="email"
                    isValid={!errors.email && touched.email}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.email && touched.email}
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

                <span className="d-block text-end">
                  Don't have an account?{" "}
                  <Link to="/signup" className={styles.link__page}>
                    Create New Account
                  </Link>
                </span>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={submitting}
                  >
                    {submitting ? "Loading..." : "Login"}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUserAccount })(LoginForm);
