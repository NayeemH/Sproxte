import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddTypeForm.module.scss";
import { connect } from "react-redux";
import { createProductType } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";

const AddTypeForm = ({ createProductType, getCategoryList, category }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [catInput, setCatInput] = useState("");

  useEffect(() => {
    if (category.length === 0) {
      getCategoryList();
    }
  }, []);

  const blurHandeler = () => {
    setTimeout(() => {
      setFocus(false);
    }, 200);
  };

  const navigate = useNavigate();

  const fileRef = useRef();
  const fileRef2 = useRef();

  const onSubmitHandeler = async (values) => {
    console.log(values);
    if (selectedFile) {
      setIsLoading(true);
      let check = await createProductType(values, selectedFile, selectedFile2);
      if (check) {
        setIsLoading(false);
        navigate("/types");
      }
      setIsLoading(false);
    } else {
      toast.error("Please select all files");
    }
  };

  //RESET IMAGE
  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setSelectedFile2(undefined);
    setCatInput("");
    setFocus(false);
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

  //ONSELECT FILE HANDELER 2
  const onSelectFile2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile2(undefined);
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size is too big");
      return;
    }
    setSelectedFile2(e.target.files[0]);
  };

  let initVals = {
    name: "",
    image: "",
    size: "",
    categoryType: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Product type name is required!"),
    image: Yup.string().nullable(),
    size: Yup.string().required("Size is required!"),
    categoryType: Yup.string().required("Valid Category name is required!"),
  });
  return (
    <div className={`${styles.wrapper} pb-5`}>
      <Card bg="white" text="dark" className={`${styles.crd} shadow `}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Add Type</span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="name" className="d-block">
                      Type Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Product type name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>
                <InputGroup className=" d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="quantity" className="d-block">
                      Category
                    </label>
                  </div>
                  <BootstrapForm.Control
                    placeholder="Type category name"
                    type="text"
                    value={catInput}
                    onChange={(e) => setCatInput(e.target.value)}
                    isValid={!errors.categoryType && touched.categoryType}
                    type="text"
                    isInvalid={errors.categoryType && touched.categoryType}
                    onFocus={() => setFocus(true)}
                    onBlur={blurHandeler}
                    autoComplete="off"
                    className={`${styles.input} w-100`}
                  />
                  <div
                    className={styles.auth__list}
                    style={{ display: focus ? "block" : "none" }}
                  >
                    <div className="list-group">
                      {category
                        .filter((item) => {
                          return item.name
                            .toLowerCase()
                            .includes(catInput.toLowerCase());
                        })
                        .map((item, i) => (
                          <div
                            className={`list-group-item ${styles.item} d-flex`}
                            key={i}
                            onClick={() => {
                              setFieldValue("categoryType", item._id);
                              setCatInput(item.name);
                            }}
                          >
                            <div className={`${styles.color}`}></div>{" "}
                            {item.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="size" className="d-block">
                      Sizes
                    </label>
                    {errors.size && touched.size ? (
                      <small className="text-danger pt-2">{errors.size}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Product type sizes"
                    name="size"
                    isValid={!errors.size && touched.size}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.size && touched.size}
                  />
                  <small>Please insert comma separated sizes.</small>
                </InputGroup>
                <div className="">
                  <InputGroup className="">
                    <div className="pb-2">
                      <label htmlFor="temp" className="d-block ">
                        Mockup Template Front Image
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

                  <InputGroup className="pt-3">
                    <div className="pb-2">
                      <label htmlFor="temp2" className="d-block ">
                        Mockup Template Back Image (optional)
                      </label>
                    </div>

                    <div className="w-100">
                      <input
                        ref={fileRef2}
                        type="file"
                        name="image2"
                        className="form-control w-100"
                        onChange={onSelectFile2}
                        id="temp2"
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
                    {isLoading ? "Loading..." : "Add Product Type"}
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
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.landing.category,
});

export default connect(mapStateToProps, { createProductType, getCategoryList })(
  AddTypeForm
);
