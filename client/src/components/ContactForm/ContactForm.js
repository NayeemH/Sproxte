import React from "react";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const onSubmitHandeler = async (values) => {
    // TODO ::: create account action
    let check = true;
    console.log(values);
  };
  let initVals = {
    username: "",
    email: "",
    message: "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email!"
      )
      .required("Email is required!"),
    message: Yup.string().required("Message is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card text="light" className={`${styles.crd} shadow`}>
        <Card.Header className="d-flex justify-content-center align-items-center bg-dark gradient_title">
          <span className={`gradient_title fw-bold ${styles.heading}`}>
            Contact Us
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
                    <label htmlFor="username" className="d-block">
                      Name
                    </label>
                    {errors.username && touched.username ? (
                      <small className="text-danger pt-2">
                        {errors.username}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your name"
                    name="username"
                    isValid={!errors.username && touched.username}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.username && touched.username}
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
                    <label htmlFor="message" className="d-block">
                      Message
                    </label>
                    {errors.message && touched.message ? (
                      <small className="text-danger">{errors.message}</small>
                    ) : null}
                  </div>
                  <Field
                    as="textarea"
                    placeholder="Type message"
                    name="message"
                    rows="5"
                    isValid={!errors.message && touched.message}
                    className={`${styles.input} form-control w-100 icon-hidden`}
                    isInvalid={errors.message && touched.message}
                  />
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                  >
                    Send Message
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

export default ContactForm;
