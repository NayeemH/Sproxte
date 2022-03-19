import React, { useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddUserForm.module.scss";
import { sendInvitation } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import ModalCard from "../Shared/ModalCard/ModalCard";

const AddUserForm = ({ sendInvitation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const onSubmitHandeler = async (values) => {
    setLoading(true);
    let check = await sendInvitation(values);
    if (check !== false) {
      setUser({
        email: values.email,
        password: check,
      });
      setLoading(false);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
    return true;
  };

  let initVals = {
    email: "",
    name: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Provide valid email"
      )
      .required("Email is required!"),
    name: Yup.string().required("Name is required!"),
  });
  return (
    <div className={styles.wrapper}>
      {user ? (
        <ModalCard
          title={
            <>
              IEP Login <br /> Informaton
            </>
          }
        >
          <BootstrapForm className="px-5 pb-4" style={{ zIndex: 999999 }}>
            <span className="fw-bold fs-4">Email</span>
            <input
              type="text"
              className="form-control mb-3"
              value={user.email}
              disabled
            />
            <span className="fw-bold fs-4">Password</span>
            <input
              type="text"
              className="form-control mb-3"
              value={user.password}
              disabled
            />
            <span className="d-block fs-small mb-3">
              This is the recently added IEP login information. Share this with
              IEP.
            </span>
            <div className="text-center">
              <Button className="btn_primary" onClick={() => setUser(null)}>
                Close
              </Button>
            </div>
          </BootstrapForm>
        </ModalCard>
      ) : null}
      <Card bg="white" text="dark" className={`${styles.crd} shadow`}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Add New IEP</span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            enableReinitialize
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="name" className="d-block">
                      Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type name address"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
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
                    placeholder="Type email address"
                    name="email"
                    isValid={!errors.email && touched.email}
                    type="email"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.email && touched.email}
                  />
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className={styles.btn}
                  >
                    {loading ? "Loading..." : "Add IEP"}
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

export default connect(null, { sendInvitation })(AddUserForm);
