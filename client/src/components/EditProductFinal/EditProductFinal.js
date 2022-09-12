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
import { getTypeList } from "../../actions/Landing.action";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const EditProductFinal = ({ category, editProduct, getTypeList, data }) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const navigate = useNavigate();
  const [priceList, setPriceList] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const fileRef = useRef();

  useEffect(() => {
    if (category.length === 0) {
      getTypeList();
    }
    if (data && data.discount && data.discount.discount.length > 0) {
      let tempDisList = [];
      data.discount.range.forEach((element, i) => {
        tempDisList.push({
          range: element,
          discount: data.discount.discount[i],
        });
      });
      setDiscountList(tempDisList);
    }
    if (
      data &&
      data.priceArray &&
      data.priceArray.range &&
      data.priceArray.price
    ) {
      let tempPriceArr = [];
      data.priceArray.range.forEach((element, i) => {
        tempPriceArr.push({
          range: element,
          price: data.priceArray.price[i],
        });
      });
      setPriceList(tempPriceArr);
    }
  }, []);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let checkDis = false;
    let checkPrice = false;
    discountList.forEach((item, i) => {
      if (
        item.discount === undefined ||
        item.discount === null ||
        item.discount === ""
      ) {
        toast.error("Please enter discount");
        checkDis = true;
      }
      if (
        item.range === undefined ||
        item.range === null ||
        item.range === ""
      ) {
        toast.error("Please enter range");
        checkDis = true;
      }
      if (i > 0 && i < discountList.length) {
        if (item.range <= parseInt(discountList[i - 1].range)) {
          toast.error("Range should be in increasing order");
          checkDis = true;
        }
      }
    });
    if (checkDis === true) {
      setIsLoading(false);
      return false;
    }
    priceList.forEach((item, i) => {
      if (
        item.price === undefined ||
        item.price === null ||
        item.price === ""
      ) {
        toast.error("Please enter price");
        checkPrice = true;
      }
      if (
        item.range === undefined ||
        item.range === null ||
        item.range === ""
      ) {
        toast.error("Please enter range");
        checkPrice = true;
      }
      if (i > 0 && i < priceList.length) {
        if (item.range <= parseInt(priceList[i - 1].range)) {
          toast.error("Price range should be in increasing order");
          checkPrice = true;
        }
      }
    });
    if (checkPrice === true) {
      setIsLoading(false);
      return false;
    }

    let check = await editProduct(
      values,
      selectedFile,
      selectedFile2,
      selectedFile3,
      selectedColor,
      data._id && data._id,
      priceList,
      discountList
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

  let initVals = {
    name: data && data.name ? data.name : "",
    price:
      data && data.priceArray
        ? parseFloat(data.priceArray.price[data.priceArray.range.length])
        : 0,
    discount:
      data && data.discount && data.discount.discount
        ? data.discount.discount[data.discount.discount.length - 1]
        : 0,
    weight: data && data.weight ? parseFloat(data.weight) : 0,
    quantity: data && data.quantity ? parseFloat(data.quantity) : 0,
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
    weight: Yup.number("Insert valid weight", "Insert valid weight").required(
      "Product weight is required!"
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
                        <label htmlFor="weight" className="d-block">
                          Weight in Lb
                        </label>
                        {errors.weight && touched.weight ? (
                          <small className="text-danger pt-2">
                            {errors.weight}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type project weight"
                        name="weight"
                        isValid={!errors.weight && touched.weight}
                        type="text"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.weight && touched.weight}
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
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
                </Row>

                <Row>
                  <Col md={12}>
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

                {/* PRICE START */}
                <>
                  {priceList.length > 0 ? (
                    <span className="d-block h5">
                      Price List with different ranges in increasing order.
                    </span>
                  ) : (
                    <></>
                  )}
                  {priceList.map((item, i) => (
                    <Row className="pb-2" key={i}>
                      <Col xs={5}>
                        <InputGroup className=" d-flex flex-column">
                          <BootstrapForm.Control
                            placeholder="Type Price Range End"
                            type="number"
                            value={priceList[i].range}
                            onChange={(e) =>
                              setPriceList(
                                priceList.map((item, j) =>
                                  j === i
                                    ? { ...item, range: e.target.value }
                                    : item
                                )
                              )
                            }
                            autoComplete="off"
                            className={`${styles.input} w-100`}
                          />
                          <small>Count Range End</small>
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Type price of the product in USD"
                          className="form-control w-100"
                          value={priceList[i].price}
                          onChange={(e) =>
                            setPriceList(
                              priceList.map((item, j) =>
                                j === i
                                  ? { ...item, price: e.target.value }
                                  : item
                              )
                            )
                          }
                          id=""
                        />
                        <small>Price in USD</small>
                      </Col>
                      <Col
                        xs={1}
                        className="d-flex justufy-content-end align-items-center"
                      >
                        <span
                          className={`${styles.del} text-danger`}
                          onClick={() =>
                            setPriceList([
                              ...priceList.filter((it, j) => j !== i),
                            ])
                          }
                        >
                          <BiTrash />
                        </span>
                      </Col>
                    </Row>
                  ))}
                </>
                <Row className="">
                  <Col xs={12}>
                    <span
                      className={`${styles.plus} shadow`}
                      onClick={() =>
                        setPriceList([
                          ...priceList,
                          {
                            price: 0,
                            range: 0,
                          },
                        ])
                      }
                    >
                      <AiOutlinePlus /> Add Price Range
                    </span>
                  </Col>
                  <Col md={12}>
                    <InputGroup className="mb-3 mt-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="price" className="d-block">
                          Default Product Price in USD
                        </label>
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
                      {errors.price && touched.price ? (
                        <small className="text-danger pt-2">
                          {errors.price}
                        </small>
                      ) : null}
                    </InputGroup>
                  </Col>
                </Row>
                {/* PRICE END */}

                <hr />
                <>
                  {discountList.length > 0 ? (
                    <span className="d-block h5">
                      Discount List with different ranges in increasing order.
                    </span>
                  ) : (
                    <></>
                  )}
                  {discountList.map((item, i) => (
                    <Row className="pb-2">
                      <Col xs={5}>
                        <InputGroup className=" d-flex flex-column">
                          <BootstrapForm.Control
                            placeholder="Type Range End"
                            type="number"
                            value={discountList[i].range}
                            onChange={(e) =>
                              setDiscountList(
                                discountList.map((item, j) =>
                                  j === i
                                    ? { ...item, range: e.target.value }
                                    : item
                                )
                              )
                            }
                            autoComplete="off"
                            className={`${styles.input} w-100`}
                          />
                          <small>Count Range End</small>
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <input
                          type="number"
                          placeholder="Type Discount for this Range (%)"
                          className="form-control w-100"
                          value={discountList[i].discount}
                          onChange={(e) =>
                            setDiscountList(
                              discountList.map((item, j) =>
                                j === i
                                  ? { ...item, discount: e.target.value }
                                  : item
                              )
                            )
                          }
                          id=""
                        />
                        <small>Discount in %</small>
                      </Col>
                      <Col
                        xs={1}
                        className="d-flex justufy-content-end align-items-center"
                      >
                        <span
                          className={`${styles.del} text-danger`}
                          onClick={() =>
                            setDiscountList([
                              ...discountList.filter((it, j) => j !== i),
                            ])
                          }
                        >
                          <BiTrash />
                        </span>
                      </Col>
                    </Row>
                  ))}
                </>
                <Row className="">
                  <Col xs={12}>
                    <span
                      className={`${styles.plus} shadow`}
                      onClick={() =>
                        setDiscountList([
                          ...discountList,
                          {
                            discount: 0,
                            range: 0,
                          },
                        ])
                      }
                    >
                      <AiOutlinePlus /> Add Discount Range
                    </span>
                  </Col>
                  <Col md={12}>
                    <InputGroup className="mb-3 mt-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="discount" className="d-block">
                          Default Product Discount (%)
                        </label>
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product discount"
                        name="discount"
                        isValid={!errors.discount && touched.discount}
                        type="number"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.discount && touched.discount}
                      />
                      {errors.discount && touched.discount ? (
                        <small className="text-danger pt-2">
                          {errors.discount}
                        </small>
                      ) : null}
                    </InputGroup>
                  </Col>
                </Row>
                <hr />

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
