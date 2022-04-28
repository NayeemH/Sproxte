import React, { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./ResetLinkForm.module.scss";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordSendEmail } from "../../actions/Auth.action";

const ResetLinkForm = ({ resetPasswordSendEmail, isAuthenticated }) => {
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
    let check = await resetPasswordSendEmail(values);
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
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email!"
      )
      .required("Email is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card className={`${styles.crd} shadow `}>
        <Card.Header className="d-flex justify-content-center align-items-center bg-dark">
          <span className={`${styles.heading} fw-bold gradient_title`}>
            Send Password Reset Link
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

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.btn} me-3`}
                    disabled={submitting}
                  >
                    {submitting ? "Loading..." : "Submit"}
                  </Button>
                  <Button
                    variant="primary"
                    className={styles.btn}
                    disabled={submitting}
                    onClick={() => navigate("/login")}
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
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { resetPasswordSendEmail })(
  ResetLinkForm
);
