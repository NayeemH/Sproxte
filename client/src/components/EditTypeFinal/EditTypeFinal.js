import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./EditTypeFinal.module.scss";
import { connect } from "react-redux";
import { editProductType } from "../../actions/Project.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const EditTypeFinal = ({
  editProductType,
  getCategoryList,
  category,
  data,
}) => {
  //STATES
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [catInput, setCatInput] = useState("");
  const [selectedFile3, setSelectedFile3] = useState();
  const [priceList, setPriceList] = useState([]);

  const [discountList, setDiscountList] = useState([]);

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

  useEffect(() => {
    if (category.length === 0) {
      getCategoryList();
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

  const navigate = useNavigate();

  const fileRef = useRef();

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
        if (item.range <= priceList[i - 1].range) {
          toast.error("Price range should be in increasing order");
          checkPrice = true;
        }
      }
    });
    if (checkPrice === true) {
      setIsLoading(false);
      return false;
    }

    let check = await editProductType(
      values,
      data && data._id,
      selectedFile,
      selectedFile2,
      selectedFile3,
      discountList,
      priceList
    );
    if (check) {
      setIsLoading(false);
      navigate("/templates");
    }
    setIsLoading(false);
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

  let initVals = {
    name: data && data.name ? data.name : "",
    image: "",
    size:
      data && data.sizes && data.sizes.length > 0 ? data.sizes.join(",") : "",
    // categoryType: data && data.categoryType ? data.categoryType : "",
    price:
      data && data.priceArray
        ? parseInt(data.priceArray.price[data.priceArray.range.length])
        : 0,
    weight: data && data.weight ? data.weight : 0,
    discount:
      data && data.discount && data.discount.discount
        ? data.discount.discount[data.discount.discount.length - 1]
        : 0,
    playerAddPrice:
      data && data.playerAddPrice ? parseInt(data.playerAddPrice) : 0,
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Product type name is required!"),
    image: Yup.string().nullable(),
    size: Yup.string().required("Size is required!"),
    // categoryType: Yup.string().required("Valid Category name is required!"),
    price: Yup.number().min(0).required("Price is required!"),
    weight: Yup.number().min(0).required("Weight is required!"),
    discount: Yup.number().min(0).max(100).required("Discount is required!"),
    playerAddPrice: Yup.number()
      .min(0)
      .required("Player add price is required!"),
  });
  return (
    <div className={`${styles.wrapper} pb-5`}>
      <Card bg="white" text="dark" className={`${styles.crd} shadow `}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>
            {data.name ? data.name : "Edit Template"}
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
                      Template Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Product template name"
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>

                <Row className="pt-3">
                  <Col md={12}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="size" className="d-block">
                          Sizes
                        </label>
                        {errors.size && touched.size ? (
                          <small className="text-danger pt-2">
                            {errors.size}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Template sizes"
                        name="size"
                        isValid={!errors.size && touched.size}
                        type="text"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.size && touched.size}
                      />
                      <small>Please insert comma separated sizes.</small>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <label htmlFor="playerAddPrice" className="d-block">
                          Extra Fee for adding new player
                        </label>
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Type product playerAddPrice"
                        name="playerAddPrice"
                        isValid={
                          !errors.playerAddPrice && touched.playerAddPrice
                        }
                        type="number"
                        className={`${styles.input} w-100`}
                        isInvalid={
                          errors.playerAddPrice && touched.playerAddPrice
                        }
                      />
                      {errors.playerAddPrice && touched.playerAddPrice ? (
                        <small className="text-danger pt-2">
                          {errors.playerAddPrice}
                        </small>
                      ) : null}
                      <small>
                        This fee applicable for adding new player after coach
                        has orderd.
                      </small>
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
                        placeholder="Type product weight"
                        name="weight"
                        isValid={!errors.weight && touched.weight}
                        type="text"
                        className={`${styles.input} w-100`}
                        isInvalid={errors.weight && touched.weight}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <hr />
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
                          {/* <div
                        className={styles.auth__list}
                        style={{ display: focus2 === i ? "block" : "none" }}
                      >
                        <div className="list-group">
                          {colors
                            .filter((item) => {
                              return item.name
                                .toLowerCase()
                                .includes(colorInput.toLowerCase());
                            })
                            .map((item, k) => (
                              <div
                                className={`list-group-item ${styles.item} d-flex`}
                                key={k}
                                onClick={() => {
                                  //console.log("click");
                                  let check = variant.filter(
                                    (v) => v.color === item.hex
                                  );

                                  if (check.length === 0) {
                                    setVariant([
                                      ...variant.map((vr, j) =>
                                        j === i
                                          ? {
                                              ...vr,
                                              color: `${
                                                item.name
                                              }-${item.hex.trim()}`,
                                            }
                                          : vr
                                      ),
                                    ]);
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
                      </div>*/}
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
                <div className="">
                  <InputGroup className="">
                    <div className="pb-2">
                      <label htmlFor="temp" className="d-block ">
                        Mockup Template Image
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

                <div className="pt-3">
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
                </div>

                <div className="pt-3 d-flex flex-column flex-md-row justify-content-start align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Edit Template"}
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

export default connect(mapStateToProps, { editProductType, getCategoryList })(
  EditTypeFinal
);
