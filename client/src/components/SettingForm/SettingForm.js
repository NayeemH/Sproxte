import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./SettingForm.module.scss";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/Profile.action";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ImUpload } from "react-icons/im";
import { IMAGE_PATH } from "../../constants/URL";

const SettingForm = ({ updateProfile, user }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await updateProfile(
      values.username,
      values.address,
      selectedFile
    );
    if (check === true) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //RESET IMAGE
  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  //ONSELECT FILE HANDELER
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size is too big");
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  let initVals = {
    username: user.name,
    image: "",
    email: user.email,
    address: user.address ? user.address : "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    address: Yup.string().required("Address is required!"),
    image: Yup.string().nullable(),
    email: Yup.string().notRequired(),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="white" text="dark" className={`${styles.crd} shadow`}>
        <Card.Title className="px-3 pt-3">
          <span className="fs-4">Profile</span>
        </Card.Title>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="">
                    <div className={styles.preview}>
                      {selectedFile ? (
                        <div
                          className={`${styles.img__wrapper} text-center mb-3`}
                        >
                          <img
                            src={preview}
                            alt={user.username}
                            className="img-fluid"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.preview}>
                      {!selectedFile ? (
                        <div
                          className={`${styles.img__wrapper} text-center mb-3`}
                        >
                          <img
                            src={`${IMAGE_PATH}small/${user.image}`}
                            alt={user.username}
                            className="h-100"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        variant="outline-dark"
                        onClick={() => fileRef.current.click()}
                      >
                        <span className="d-block mr-4">
                          <ImUpload />
                        </span>{" "}
                        <span className="pl-3 d-block"> Change Image</span>
                      </Button>
                    </div>
                    <div className="" style={{ display: "none" }}>
                      <input
                        ref={fileRef}
                        type="file"
                        name="image"
                        onChange={onSelectFile}
                      />
                    </div>
                  </div>
                  <div className={`text-end ${styles.change}`}>
                    <Link to="/settings/password" className="btn btn-primary">
                      Change Password
                    </Link>
                  </div>
                </div>
                <hr />
                <InputGroup className="my-3 d-flex flex-column">
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
                    placeholder="Type name"
                    name="username"
                    isValid={!errors.username && touched.username}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.username && touched.username}
                  />
                </InputGroup>
                <InputGroup className="my-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="address" className="d-block">
                      Address
                    </label>
                    {errors.address && touched.address ? (
                      <small className="text-danger pt-2">
                        {errors.address}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type shipping address"
                    name="address"
                    isValid={!errors.address && touched.address}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.address && touched.address}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="email" className="d-block">
                      Email
                    </label>
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Email"
                    name="email"
                    type="text"
                    className={`${styles.input} w-100`}
                    disabled
                  />
                  <small className="pt-2">
                    Email Address Can not be changed.
                  </small>
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </Button>
                  <Button
                    variant="primary"
                    type="reset"
                    onClick={resetlHandeler}
                    className={`${styles.btn} mx-3`}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateProfile })(SettingForm);
