import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./CreateOrgForm.module.scss";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { ImUpload } from "react-icons/im";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createOrg } from "../../actions/Dashboard.action";
import { PROTOCOL } from "../../constants/URL";
import { useLocation, useNavigate } from "react-router-dom";
const queryString = require("query-string");

const CreateOrgForm = ({ createOrg }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const navigate = useNavigate();

  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    if (selectedFile) {
      setIsLoading(true);
      let check = await createOrg(values, selectedFile);
      if (check) {
        setIsLoading(false);
        setTimeout(() => {
          window.location.replace(
            `${PROTOCOL}${values.name}.${window.location.host}`
          );
        }, 1000);
      }
      setIsLoading(false);
    } else {
      toast.error("Please select a file");
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
    navigate("/");
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
    name: parsed.org ? parsed.org : "",
    image: "",
    email: "",
    password: "",
    password2: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        "^[a-z]+$",
        "Name can not contain special charecter, space or Uppercase letter."
      )
      .required("Organization name is required!"),
    image: Yup.string().nullable(),
    email: Yup.string().required("Email is required!"),
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
          <span className={styles.heading}>Create Organization</span>
        </Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="name" className="d-block">
                      Organization Name
                    </label>
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type organization name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                  {errors.name && touched.name ? (
                    <small className="text-danger pt-2">{errors.name}</small>
                  ) : null}
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="email" className="d-block">
                      Admin Email
                    </label>
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Provide admin email address"
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

                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password" className="d-block">
                      Admin Password
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

                <div className="">
                  <div className={styles.preview}>
                    {selectedFile ? (
                      <div className="text-center pb-3">
                        <img
                          src={preview}
                          alt="admin"
                          style={{ maxHeight: "50px" }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="d-flex  justify-content-between align-items-center">
                    {" "}
                    <label htmlFor="image" className="d-block">
                      Logo
                    </label>
                    <Button
                      variant="outline-light"
                      onClick={() => fileRef.current.click()}
                    >
                      <span className="d-block mr-4">
                        <ImUpload />
                      </span>{" "}
                      <span className="pl-3 d-block"> Upload Image</span>
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

                <div className={styles.req}>
                  <span className="d-block pt-2">
                    {" "}
                    * Password must be atleast 6 characters long, one number
                    [0-9],one uppercase letter [A-Z] and one special character
                    [! @ # $ % & *].
                  </span>
                </div>

                <div className="pt-2 d-flex flex-column flex-md-row justify-content-start align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Create Organization"}
                  </Button>
                  <Button
                    variant="primary"
                    type="reset"
                    onClick={resetlHandeler}
                    className={`${styles.btn_cancel} mx-md-3 mx-0`}
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

export default connect(null, { createOrg })(CreateOrgForm);
