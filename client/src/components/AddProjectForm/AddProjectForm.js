import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddProjectForm.module.scss";
import { connect } from "react-redux";
import { createProject } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImUpload } from "react-icons/im";

const AddProjectForm = ({ createProject }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    if (selectedFile) {
      setIsLoading(true);
      let check = await createProject(values, selectedFile);
      if (check) {
        setIsLoading(false);
        navigate("/dashboard");
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
    name: "",
    image: "",
    description: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required!"),
    image: Yup.string().nullable(),
    description: Yup.string().required("Description is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Add Project</span>
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
                    <label htmlFor="name" className="d-block">
                      Project Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type project name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
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
                  <div className="d-flex  justify-content-between align-items-center">
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

                <div className="pt-3 d-flex flex-column flex-md-row justify-content-start align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Add Project"}
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

export default connect(null, { createProject })(AddProjectForm);
