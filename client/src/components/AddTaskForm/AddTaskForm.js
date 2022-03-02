import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddTaskForm.module.scss";
import { connect } from "react-redux";
import { createProjectTask } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImUpload } from "react-icons/im";
import { BsTrash, BsPlusCircle } from "react-icons/bs";

const AddTaskForm = ({ createProjectTask, id }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState([]);
  const navigate = useNavigate();

  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    if (input.length === 0) {
      toast.error("Please add atleast one step");
      return;
    }
    setIsLoading(true);
    let check = await createProjectTask(values, selectedFile, id, input);
    if (check) {
      setIsLoading(false);
      navigate(`/project/${id}`);
    }
    setIsLoading(false);
  };
  const addHandeler = () => {
    setInput([...input, { id: input.length, name: "" }]);
  };

  const deleteHandeler = (id) => {
    setInput([...input.filter((item) => item.id !== id)]);
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

  const handelChange = (e, id) => {
    setInput(
      input.map((item, i) => {
        if (id === item.id) {
          return { id: i, name: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  let initVals = {
    name: "",
    image: "",
    description: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required!"),
    image: Yup.string().nullable(),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Add Task</span>
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
                      Task Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type task name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>
                <span>Steps of Task</span>
                {input.map((inputText) => (
                  <Row className="mt-2" key={inputText.id}>
                    <Col xs={11}>
                      <input
                        key={inputText.id}
                        type="text"
                        value={inputText.name}
                        onChange={(e) => handelChange(e, inputText.id)}
                        className="form-control"
                        placeholder="Step Name"
                        required
                      />
                    </Col>
                    <Col
                      xs={1}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <span
                        style={{
                          color: "#dc3545",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                        onClick={() => deleteHandeler(inputText.id)}
                      >
                        <BsTrash />
                      </span>
                    </Col>
                  </Row>
                ))}
                <div className={`text-center pt-4 ${styles.subcat_plus}`}>
                  <BsPlusCircle
                    onClick={addHandeler}
                    style={{ cursor: "pointer" }}
                  />{" "}
                  <span
                    onClick={addHandeler}
                    style={{ cursor: "pointer" }}
                    className="ml-2"
                  >
                    Add Step
                  </span>
                </div>

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
                    {isLoading ? "Loading..." : "Add Task"}
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

export default connect(null, { createProjectTask })(AddTaskForm);
