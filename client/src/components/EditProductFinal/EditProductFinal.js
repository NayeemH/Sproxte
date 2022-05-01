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
import styles from "./EditProductFinal.module.scss";
import { connect } from "react-redux";
import { editProduct } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import colors from "../../config/Colors";
import { getTypeList } from "../../actions/Landing.action";

const EditProductFinal = ({ category, editProduct, getTypeList, data }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const navigate = useNavigate();

  const fileRef = useRef();
  const fileRef2 = useRef();

  useEffect(() => {
    if (category.length === 0) {
      getTypeList();
    }
  }, []);

  const blurHandeler = () => {
    setTimeout(() => {
      setFocus(false);
    }, 200);
  };
  const blurHandeler2 = () => {
    setTimeout(() => {
      setFocus2(false);
    }, 200);
  };

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    // let check = await createProject(
    //   values,
    //   selectedFile,
    //   selectedFile2,
    //   selectedFile3,
    //   selectedColor
    // );

    let check = await editProduct(
      values,
      selectedFile,
      selectedFile2,
      selectedFile3,
      selectedColor,
      data._id && data._id
    );

    if (check) {
      setIsLoading(false);
      navigate("/products");
    }

    setIsLoading(false);
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
    name: data && data.name ? data.name : "",
    price: data && data.price ? parseInt(data.price) : 0,
    discount: data && data.discount ? parseInt(data.discount) : 0,
    quantity: data && data.quantity ? parseInt(data.quantity) : 0,
    productType: data && data.productType ? data.productType : "",
    size:
      data && data.sizes && data.sizes.length > 0 ? data.sizes.join(",") : "",
    image: "",
    description: data && data.description ? data.description : "",
    featured: data && data.featured == true ? true : false,
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required!"),
    quantity: Yup.number().required("Product quantity is required!"),
    price: Yup.number("Insert valid price", "Insert valid price").required(
      "Product price is required!"
    ),
    discount: Yup.number("Insert valid discount", "Insert valid discount")
      .min(0)
      .max(100)
      .required("Product discount is required!"),
    size: Yup.string().required("Product size is required!"),
    productType: Yup.string().nullable(),
    image: Yup.string().nullable(),
    description: Yup.string().required("Description is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="white" text="dark" className={`${styles.crd} shadow`}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>
            {data && data.name ? data.name : "Edit Product"}
          </span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            enableReinitialize
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
                  <Col md={12}>
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
                  {/* <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="productType" className="d-block">
                          Template
                        </label>
                        {errors.productType && touched.productType ? (
                          <small className="text-danger pt-2">
                            {errors.productType}
                          </small>
                        ) : null}
                      </div>
                      <BootstrapForm.Control
                        placeholder="Type product template name"
                        value={typeInput}
                        isValid={!errors.productType && touched.productType}
                        type="text"
                        onChange={(e) => setTypeInput(e.target.value)}
                        className={`${styles.input} w-100`}
                        isInvalid={errors.productType && touched.productType}
                        onFocus={() => setFocus2(true)}
                        onBlur={blurHandeler2}
                      />
                      <div
                        className={styles.auth__list}
                        style={{ display: focus2 ? "block" : "none" }}
                      >
                        <div className="list-group">
                          {category
                            .filter((item) => {
                              return item.name
                                .toLowerCase()
                                .includes(typeInput.toLowerCase());
                            })
                            .map((item, i) => (
                              <div
                                className={`list-group-item ${styles.item} d-flex`}
                                key={i}
                                onClick={() => {
                                  setFieldValue("productType", item._id);
                                  setTypeInput(item.name);
                                }}
                              >
                                {item.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    </InputGroup>
                  </Col> */}
                  {/* <Col md={6}>
                    <InputGroup className=" d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="quantity" className="d-block">
                          Colors
                        </label>
                      </div>
                      <BootstrapForm.Control
                        placeholder="Type Color name or HEX code"
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
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
                          {colors
                            .filter((item) => {
                              return item.name
                                .toLowerCase()
                                .includes(colorInput.toLowerCase());
                            })
                            .map((item, i) => (
                              <div
                                className={`list-group-item ${styles.item} d-flex`}
                                key={i}
                                onClick={() => {
                                  //console.log("click");

                                  let check = selectedColor.filter(
                                    (clr) => clr.hex === item.hex
                                  );
                                  if (check.length === 0) {
                                    setSelectedColor([...selectedColor, item]);
                                  } else {
                                    toast.error("Color already selected");
                                  }
                                  setColorInput("");
                                }}
                              >
                                <div
                                  className={`${styles.color} me-2`}
                                  style={{ background: `${item.hex}` }}
                                ></div>{" "}
                                {item.name} ({item.hex})
                              </div>
                            ))}
                        </div>
                      </div>
                    </InputGroup>
                    <Row className="py-2 pb-4">
                      {selectedColor.map((item, i) => (
                        <Col xs={1} key={i}>
                          <div
                            className={styles.color}
                            style={{ background: `${item.hex}` }}
                          ></div>
                        </Col>
                      ))}
                    </Row>
                  </Col> */}
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
                        placeholder="Type discount in % "
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
                    {isLoading ? "Loading..." : "Edit Product"}
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

export default connect(mapStateToProps, { editProduct, getTypeList })(
  EditProductFinal
);
