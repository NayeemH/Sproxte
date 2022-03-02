import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./UploadStepForm.module.scss";
import { connect } from "react-redux";
import { uploadStep } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ImUpload } from "react-icons/im";

const UploadStepForm = ({ uploadStep }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { stepId, projectId } = useParams();

  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    if (selectedFile) {
      setIsLoading(true);
      let check = await uploadStep(values, selectedFile, stepId, projectId);
      if (check === true) {
        setIsLoading(false);
        navigate(`/project/${projectId}`);
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
    title: "",
    image: "",
    type: "static",
    description: "",
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    image: Yup.string().nullable(),
    type: Yup.string().required("Type is required!"),
    description: Yup.string().required("Description is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Upload Image</span>
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
                    <label htmlFor="title" className="d-block">
                      Title
                    </label>
                    {errors.title && touched.title ? (
                      <small className="text-danger pt-2">{errors.title}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Title"
                    name="title"
                    isValid={!errors.title && touched.title}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.title && touched.title}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="description" className="d-block">
                      Description
                    </label>
                    {errors.description && touched.description ? (
                      <small className="text-danger pt-2">
                        {errors.description}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type project description"
                    name="description"
                    isValid={!errors.description && touched.description}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.description && touched.description}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="type" className="d-block">
                      Image Type
                    </label>
                    {errors.type && touched.type ? (
                      <small className="text-danger">{errors.type}</small>
                    ) : null}
                  </div>

                  <Field
                    as={BootstrapForm.Select}
                    placeholder="Select Type of Image"
                    name="type"
                    className={` form-control w-100`}
                  >
                    <option value="static">Static</option>
                    <option value="3d">360</option>
                  </Field>
                </InputGroup>
                <div className="">
                  <div className={styles.preview}>
                    {selectedFile ? (
                      <div className="text-center pb-3">
                        <img
                          src={preview}
                          alt="admin"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <label htmlFor="image" className="d-block">
                      Image
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

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Upload Image"}
                  </Button>
                  <Button
                    variant="primary"
                    type="reset"
                    onClick={resetlHandeler}
                    className={`${styles.btn_cancel} mx-3`}
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

export default connect(null, { uploadStep })(UploadStepForm);
