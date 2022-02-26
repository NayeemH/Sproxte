import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AnimatedBG from "../shared/AnimatedBG/AnimatedBG";
import styles from "./ForgetPassword.module.css";
import logoImg from "../../assets/Logo.png";
import { resetPassword } from "../../actions/Dashboard.action";
import { connect } from "react-redux";

const ForgetPassword = ({ resetPassword }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    setLoading(true);
    let check = await resetPassword(values.email);
    if (check === true) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  };

  let initVals = {
    email: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
  });
  return (
    <>
      <AnimatedBG />
      <div className={styles.wrapper}>
        <Card bg="dark" text="light" className={styles.crd}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span className={styles.heading}>Reset Password</span>
            <img src={logoImg} className={styles.logo} alt="" />
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
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Provide your email address"
                      name="email"
                      isValid={!errors.email && touched.email}
                      type="email"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.email && touched.email}
                    />
                    {errors.email && touched.email ? (
                      <small className="text-danger pt-2">{errors.email}</small>
                    ) : null}
                  </InputGroup>
                  <small className={styles.small_text}>
                    You will recieve an email containing information about
                    setting up new password.
                  </small>
                  <div className="pt-4 d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.btn}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </Button>
                    <Button
                      variant="primary"
                      as={Link}
                      to="/"
                      className={styles.btn}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default connect(null, { resetPassword })(ForgetPassword);
