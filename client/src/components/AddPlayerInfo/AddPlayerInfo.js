import React, { useRef, useState } from "react";
import { Form as BootstrapForm, InputGroup, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styles from "./AddPlayerInfo.module.scss";
import { addPlayer } from "../../actions/Project.action";
import { Select } from "@mantine/core";

const AddPlayerInfo = ({ modals, project, addPlayer }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef();

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await addPlayer(values, selectedFile, project._id);
    if (check) {
      setIsLoading(false);
      modals.closeAll();
    }
    setIsLoading(false);
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
    modals.closeAll();
  };

  let initVals = {
    name: "",
    email: "",
    size: "",
    image: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Please provide valid email.")
      .required("Email is required!"),
    size: Yup.string().required("Size is required!"),
    image: Yup.string().nullable(),
  });

  return (
    <div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="name" className="d-block">
                  Name
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Name..."
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
                <label htmlFor="name" className="d-block">
                  Email
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Email..."
                name="email"
                isValid={!errors.name && touched.name}
                type="email"
                className={`${styles.input} w-100`}
                isInvalid={errors.email && touched.email}
              />
              {errors.email && touched.email ? (
                <small className="text-danger pt-2">{errors.email}</small>
              ) : null}
            </InputGroup>

            <Select
              label="Size"
              placeholder="Pick one"
              value={values.size}
              onChange={(e) => setFieldValue("size", e)}
              className={`${styles.input} w-100 mb-3`}
              required
              error={errors.size && touched.size ? errors.size : null}
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />

            <div className="">
              <InputGroup className="">
                <div className="pb-2">
                  <label htmlFor="temp" className="d-block ">
                    Image
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
                {isLoading ? "Loading..." : "Add Player"}
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
