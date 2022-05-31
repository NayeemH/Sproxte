import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddProjectForm.module.scss";
import { connect } from "react-redux";
import { createProject } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";

const AddProjectForm = ({ category, createProject, getTypeList }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const navigate = useNavigate();

  const fileRef = useRef();

  useEffect(() => {
    if (category.length === 0) {
      getTypeList();
    }
  }, []);

  const onSubmitHandeler = async (values) => {
    if (selectedFile) {
      setIsLoading(true);
      let check = await createProject(
        values,
        selectedFile,
        selectedFile2,
        selectedFile3,
        selectedColor
      );

      if (check) {
        setIsLoading(false);
        navigate("/products");
      }

      setIsLoading(false);
    } else {
      toast.error("Please select a file");
    }
  };

  //RESET IMAGE
  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setSelectedFile2(undefined);
    setSelectedFile3(undefined);
    setSelectedColor([]);
    setColorInput("");
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

  //ONSELECT FILE HANDELER Multiple
  const onSelectFile3 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile3(undefined);
      return;
    }

    let flag = false;
    let list = e.target.files;
    for (let index = 0; index < list.length; index++) {
      if (list[index].size > 2000000) {
        toast.error("File size is too big");
        flag = true;
      }
    }
    if (!flag) {
      setSelectedFile3(list);
    }
  };

  let initVals = {
    name: "",
    price: 0,
    discount: 0,
    quantity: 0,
    weight: 0,
    // productType: "",
    size: "",
    image: "",
    description: "",
    featured: false,
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required!"),
    quantity: Yup.number().required("Product quantity is required!"),
    price: Yup.number("Insert valid price", "Insert valid price").required(
      "Product price is required!"
    ),
    weight: Yup.number(
      "Insert valid weight",
      "Insert valid weight in gram"
    ).required("Product weight is required!"),
    price: Yup.number("Insert valid price", "Insert valid price")
      .min(0)
      .max(100)
      .required("Product price is required!"),
    size: Yup.string().required("Product size is required!"),
    // productType: Yup.string().required("Product template is required!"),
    image: Yup.string().nullable(),
    description: Yup.string().required("Description is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="white" text="dark" className={`${styles.crd} shadow`}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Add Product</span>
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
                      Product Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type product name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>

                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="weight" className="d-block">
                          Weight in grams
                        </label>
                        {errors.weight && touched.weight ? (
                          <small className="text-danger pt-2">
                            {errors.weight}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product weight"
                        name="weight"
                        isValid={!errors.weight && touched.weight}
                        type="text"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.weight && touched.weight}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
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
                  </Col>

                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="size" className="d-block">
                          Product Size
                        </label>
                        {errors.size && touched.size ? (
                          <small className="text-danger pt-2">
                            {errors.size}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type sizes comma separated. "
                        name="size"
                        isValid={!errors.size && touched.size}
                        type="text"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.size && touched.size}
                      />
                      <small>Example: L,XL,XXL,M</small>
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="discount" className="d-block">
                          Discount (%)
                        </label>
                        {errors.discount && touched.discount ? (
                          <small className="text-danger pt-2">
                            {errors.discount}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product discount in %"
                        name="discount"
                        isValid={!errors.discount && touched.discount}
                        type="number"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.discount && touched.discount}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="price" className="d-block">
                          Product Price
                        </label>
                        {errors.price && touched.price ? (
                          <small className="text-danger pt-2">
                            {errors.price}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product price"
                        name="price"
                        isValid={!errors.price && touched.price}
                        type="number"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.price && touched.price}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="quantity" className="d-block">
                          Product Quantity
                        </label>
                        {errors.quantity && touched.quantity ? (
                          <small className="text-danger pt-2">
                            {errors.quantity}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product quantity"
                        name="quantity"
                        isValid={!errors.quantity && touched.quantity}
                        type="number"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.quantity && touched.quantity}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <div className="d-flex  justify-content-between align-items-center">
                      {" "}
                      <label htmlFor="image" className="d-block">
                        Image
                      </label>
                    </div>
                    <div className="">
                      <input
                        ref={fileRef}
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={onSelectFile}
                      />
                    </div>
                  </Col>
                  {/* <Col md={6} className="mb-3">
                    <div className="d-flex  justify-content-between align-items-center">
                      {" "}
                      <label htmlFor="image" className="d-block">
                        Back Image (optional)
                      </label>
                    </div>
                    <div className="">
                      <input
                        ref={fileRef2}
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={onSelectFile2}
                      />
                    </div>
                  </Col> */}
                </Row>

                {/* <div className="">
                  <div className="d-flex  justify-content-between align-items-center">
                    {" "}
                    <label htmlFor="image" className="d-block">
                      Layouts (Optional)
                    </label>
                  </div>
                  <div className="">
                    <input
                      multiple
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={onSelectFile3}
                    />
                  </div>
                </div> */}

                <InputGroup className="my-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="featured" className="d-flex">
                      <Field
                        as={BootstrapForm.Check}
                        name="featured"
                        isValid={!errors.featured && touched.featured}
                        type="checkbox"
                        isInvalid={errors.featured && touched.featured}
                      />{" "}
                      <span className="ms-2">Featured </span>
                    </label>
                  </div>
                  <small>
                    Check this if you want to make this product featured
                  </small>
                </InputGroup>

                <div className="pt-3 d-flex flex-column flex-md-row justify-content-start align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Add Product"}
                  </Button>
                  <Button
                    variant="primary"
                    type="reset"
                    onClick={resetlHandeler}
                    className={`${styles.btn} mx-md-3 mx-0 mt-md-0 mt-2`}
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
  category: state.landing.types,
});

export default connect(mapStateToProps, { createProject, getTypeList })(
  AddProjectForm
);
