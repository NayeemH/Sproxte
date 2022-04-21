import React, { useRef, useState } from "react";
import { Form as BootstrapForm, InputGroup, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./AddPlayerInfo.module.scss";
import { addPlayer } from "../../actions/Project.action";

const AddPlayerInfo = ({ modals, project, addPlayer }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    if (selectedFile) {
      setIsLoading(true);
      let check = await addPlayer(values, selectedFile, project._id);
      if (check) {
        setIsLoading(false);
      }
      setIsLoading(false);
    } else {
      toast.error("Please select all files");
    }
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

  //RESET IMAGE
  const resetlHandeler = () => {
    setSelectedFile(undefined);
  };

  let initVals = {
    name: "",
    image: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Product type name is required!"),
    image: Yup.string().nullable(),
  });

  return (
    <div>
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
                  Category Name
                </label>
                {errors.name && touched.name ? (
                  <small className="text-danger pt-2">{errors.name}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Category name"
                name="name"
                isValid={!errors.name && touched.name}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.name && touched.name}
              />
            </InputGroup>

            <div className="">
              <InputGroup className="">
                <div className="pb-2">
                  <label htmlFor="temp" className="d-block ">
                    Mockup Template
                  </label>
                </div>

                <div className="w-100">
                  <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    className="form-control w-100"
                    onChange={onSelectFile}
                    id="temp"
                  />
                </div>
              </InputGroup>
            </div>

            <div className="pt-3 d-flex flex-column flex-md-row justify-content-start align-items-center">
              <Button
                variant="primary"
                type="submit"
                className={styles.btn}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add Category"}
              </Button>
              <Button
                variant="primary"
                type="reset"
                onClick={resetlHandeler}
                className={`${styles.btn} mx-md-3 mx-0`}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { addPlayer })(AddPlayerInfo);
