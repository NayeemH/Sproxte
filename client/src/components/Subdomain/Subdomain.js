import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AnimatedBG from "../shared/AnimatedBG/AnimatedBG";
import styles from "./Subdomain.module.css";
import { getOrganization } from "../../actions/Dashboard.action";
import { connect } from "react-redux";
import { PROTOCOL } from "../../constants/URL";

const Subdomain = ({ getOrganization }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await getOrganization(values);
    if (check === 200) {
      setTimeout(() => {
        setIsLoading(false);
        window.location.replace(
          `${PROTOCOL}${values.email}.${window.location.host}`
        );
      }, 1000);
    } else if (check === 404) {
      navigate(`/create-organization?org=${values.email}`);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    email: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        "^[a-z]+$",
        "Name can not contain special charecter, space or Uppercase letter."
      )
      .required("Organization Name is required!"),
  });
  return (
    <>
      <AnimatedBG />
      <div className={styles.wrapper}>
        <Card bg="dark" text="light" className={styles.crd}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span className={styles.heading}>Organization</span>
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
                        Organization Name
                      </label>
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Provide your organization name."
                      name="email"
                      isValid={!errors.email && touched.email}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.email && touched.email}
                    />
                    {errors.email && touched.email ? (
                      <small className="text-danger pt-2">{errors.email}</small>
                    ) : null}
                  </InputGroup>

                  <div className="pt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.btn}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Submit"}
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

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getOrganization })(Subdomain);
