import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCart, setSize } from "../../../actions/Cart.action";
import { toast } from "react-toastify";
import styles from "./OrderDescription.module.scss";
import colors from "../../../config/Colors";
import { IMAGE_PATH } from "../../../constants/URL";
import { useNavigate } from "react-router-dom";
import { useModals } from "@mantine/modals";
import { MultiSelect, Select, Text } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsSquareFill } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import { setTeamCount } from "../../../actions/Coach.action";
import { setStore } from "../../../utils/localstore";
import { MAX_SIZE } from "../../../constants/size";

const OrderDescription = ({
  sizes,
  addToCart,
  product,
  color,
  user,
  team_count,
  selectedColor,
  isAuthenticated,
  setTeamCount,
  cart,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(
    team_count === null ? 1 : team_count
  );
  const [selectedLayout, setSelectedLayout] = useState();
  const [selectedFont, setSelectedFont] = useState();
  const [mainText, setMainText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [mainTextColor, setMainTextColor] = useState("Red");
  const [secondaryTextColor, setSecondaryTextColor] = useState("Red");
  const [selectedFileBack, setSelectedFile2] = useState();
  const [orderFontFamily, setOrderFontFamily] = useState("Open Sans");
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const [orderColor, setOrderColor] = useState(null);
  const [orderColor2, setOrderColor2] = useState(null);
  const [my_swiper, set_my_swiper] = useState({});
  const fileRef = useRef();
  const navigate = useNavigate();
  const selectRef = useRef(null);
  const selectRef2 = useRef(null);

  const modals = useModals();

  useEffect(() => {
    if (
      (selectedFile && selectedFile.length === 0) ||
      selectedFile === undefined
    ) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile[0]);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //Submit handeler
  const submitHandeler = () => {
    if (isAuthenticated === false) {
      modals.openConfirmModal({
        title: "Login Required",
        centered: true,
        children: (
          <Text size="md">
            Please, login first to add product into your cart.
          </Text>
        ),
        labels: { confirm: "Login Now", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () => navigate("/login"),
      });
    }
    // if (user.userType === "coach" && cart.length > 0) {
    //   modals.openConfirmModal({
    //     title: "You can not order more than one product as a coach at a time",
    //     centered: true,
    //     children: (
    //       <Text size="md">
    //         You can not order more than one product as a coach at a time. Please
    //         complete the payment for the previous cart order and try again.
    //       </Text>
    //     ),
    //     labels: { confirm: "Go to Cart Page", cancel: "Cancel" },
    //     confirmProps: { color: "red" },
    //     onCancel: () => {},
    //     onConfirm: () => navigate("/cart"),
    //   });
    //   return;
    // }

    // CART MODAL SHOW
    modals.openConfirmModal({
      centered: true,
      children: (
        <>
          <div className="text-center">
            <img
              src={`${IMAGE_PATH}small/${product.pngImageFront}`}
              className={styles.prev__img}
              alt=""
            />
          </div>
          <Text size="md">
            Are you sure you want to add this product into your cart?
          </Text>
        </>
      ),
      labels: { confirm: "Add to Cart", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => mainSubmitHandeler(),
    });
  };

  const mainSubmitHandeler = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
    } else {
      if (!description) {
        toast.error("Please enter a description");
      } else if (quantity < 1) {
        toast.error("Please enter a valid quantity");
      } else if (!size) {
        toast.error("Please select size");
      } else if (!color) {
        toast.error("Please select color");
      } else if (!orderColor) {
        toast.error("Please select primary color");
      } else if (orderColor.length !== 2) {
        toast.error("Please select 2 primary color");
      } else {
        addToCart(
          description,
          size,
          selectedFile,
          selectedFileBack,
          mainText,
          secondaryText,
          mainTextColor,
          secondaryTextColor,
          selectedLayout,
          quantity,
          product,
          color,
          "custom",
          selectedFont,
          orderFontFamily,
          orderColor,
          orderColor2,
          selectedFont
        );

        setTimeout(() => {
          setStore(cart);
        }, 500);
        if (user.userType === "coach") {
          if (team_count === null) {
            setTeamCount(quantity);
          }
        }
        resetlHandeler();
        setDescription("");
        navigate("/");
      }
    }
  };

  //RESET IMAGE
  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    setMainText("");
    setMainTextColor("");
    setSecondaryText("");
    setSecondaryTextColor("");
    setSelectedFile2(undefined);
    setSelectedLayout(undefined);
  };

  //ONSELECT FILE HANDELER
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    let flag = false;
    let list = e.target.files;
    for (let index = 0; index < list.length; index++) {
      if (list[index].size > MAX_SIZE) {
        toast.error("File size is too big");
        flag = true;
      }
    }
    if (!flag) {
      setSelectedFile(list);
    }
  };

  //ONSELECT FILE HANDELER 2
  const onSelectFile2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile2(undefined);
      return;
    }
    if (e.target.files[0].size > MAX_SIZE) {
      toast.error("File size is too big");
      return;
    }
    setSelectedFile2(e.target.files[0]);
  };
  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={0}
        className="mySwiper2 swiper-v"
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
      >
        <SwiperSlide className={styles.slide_left}>
          {product && product.imageData && (
            <>
              <ProductCard
                title={product.name}
                h
                // img={
                //   selectedColor
                //     ? `${IMAGE_PATH}small/${
                //         product.imageData.filter(
                //           (item) => item.color === selectedColor
                //         )[0].image
                //       }`
                //     : `${IMAGE_PATH}small/${product.pngImageFront}`
                // }
                img={`${IMAGE_PATH}small/${product.pngImageFront}`}
                id={product._id}
                template
                hidden={true}
                price={product.priceArray.price[0]}
                noshadow
                notitle={true}
                discount={product.discount?.discount[0]}
              />
              <h3 className="pt-3">{product.name}</h3>
              {/* <span className="d-block text-center text-secondary fs-6 pb-3">
                Added <Moment fromNow>{product.createdAt}</Moment>
              </span> */}

              {/* PRICE LIST */}
              <div className="text-center text-secondary fs-6 pb-3">
                {product.priceArray.price.map((item, index) => {
                  if (product.priceArray.price.length === 1) {
                    return (
                      <span key={index}>
                        {" "}
                        {product.priceArray.range[index - 1]}{" "}
                        <span className="fw-bold">${item}</span>
                      </span>
                    );
                  } else if (index === product.priceArray.price.length - 1) {
                    return (
                      <span key={index}>
                        {" "}
                        / {product.priceArray.range[index - 1]}+{" "}
                        <span className="fw-bold">${item}</span>
                      </span>
                    );
                  } else if (index === 0) {
                    return (
                      <span key={index}>
                        1 - {product.priceArray.range[index]}{" "}
                        <span className="fw-bold">${item}</span>
                      </span>
                    );
                  } else {
                    return (
                      <span key={index}>
                        {" "}
                        / {product.priceArray.range[index - 1] + 1} -{" "}
                        {product.priceArray.range[index]}{" "}
                        <span className="fw-bold">${item}</span>
                      </span>
                    );
                  }
                })}
              </div>

              <Button
                className="btn_primary mt-2"
                onClick={() => my_swiper.slideNext()}
              >
                Next
              </Button>
            </>
          )}
        </SwiperSlide>
        <SwiperSlide className={styles.slide_left}>
          <Card className="crd">
            <Card.Body>
              <span className="d-block fs-4">Discount Ranges</span>
              <div className="pt-md-3 pt-2">
                <div
                  className="d-flex 
                  justify-content-between align-items-center"
                >
                  <span className="d-block fw-bold fs-6">Range</span>
                  <span className="d-block fw-bold fs-6">Discount</span>
                </div>
                <hr className="my-1" />
                {product && product.discount && product.discount.range ? (
                  product.discount.range.map((dis, i) => (
                    <div key={i}>
                      <div
                        className="d-flex 
                  justify-content-between align-items-center"
                      >
                        <span className="d-block fw-bold fs-6">
                          {i === 0 ? 1 : product.discount.range[i - 1] + 1} -{" "}
                          {dis}
                        </span>
                        <span className="d-block fw-bold fs-6">
                          {product.discount.discount[i]}%
                        </span>
                      </div>
                      <hr className="my-1" />
                    </div>
                  ))
                ) : (
                  <></>
                )}
                {product &&
                product.discount &&
                product.discount.range &&
                product.discount.range.length > 0 ? (
                  <>
                    <div
                      className="d-flex 
                  justify-content-between align-items-center"
                    >
                      <span className="d-block fw-bold fs-6">
                        {
                          product.discount.range[
                            product.discount.range.length - 1
                          ]
                        }
                        +
                      </span>
                      <span className="d-block fw-bold fs-6">
                        {
                          product.discount.discount[
                            product.discount.discount.length - 1
                          ]
                        }
                        %
                      </span>
                    </div>
                    <hr className="my-1" />
                  </>
                ) : (
                  <>
                    <div
                      className="d-flex 
                  justify-content-between align-items-center"
                    >
                      <span className="d-block fw-bold  fs-6">
                        For all count
                      </span>
                      <span className="d-block fw-bold  fs-6">
                        {
                          product.discount.discount[
                            product.discount.discount.length - 1
                          ]
                        }
                        %
                      </span>
                    </div>
                    <hr className="my-1" />
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
          <Card className={`${styles.crd} shadow`}>
            <Card.Body>
              <Row>
                <Col>
                  <span className="d-block fs-5 pb-2">Upload Front Images</span>
                  <div className="w-100">
                    <input
                      type="file"
                      name="image"
                      className="form-control w-100"
                      onChange={onSelectFile}
                      id="temp2"
                      multiple
                    />
                  </div>
                  {/* <div className="d-flex align-items-center justify-content-center pt-2">
                    <Button
                      variant="outline-dark"
                      onClick={() => fileRef.current.click()}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span className="d-block ">
                        <span className="me-2">
                          <ImUpload />
                        </span>
                        Upload Image
                      </span>
                    </Button>
                  </div>
                  <div style={{ display: "none" }}>
                    <input
                      ref={fileRef}
                      multiple
                      type="file"
                      name="image"
                      onChange={onSelectFile}
                    />
                  </div>
                  {selectedFile && selectedFile.length > 0 ? (
                    <span className="d-block pt-2 fs-6 text-small">
                      {selectedFile.length} file selected
                    </span>
                  ) : null} */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="pt-3">
                    <div className="pb-2">
                      <label htmlFor="temp2" className="d-block ">
                        Upload Back Image (optional)
                      </label>
                    </div>

                    <div className="w-100">
                      <input
                        type="file"
                        name="image2"
                        className="form-control w-100"
                        onChange={onSelectFile2}
                        id="temp2"
                      />
                    </div>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="py-4 d-flex align-items-center justify-content-center">
            <span className="fs-5 fw-bold me-3">
              {user && user.userType !== "client" && user.userType !== "admin"
                ? "Team Member Count"
                : "Quantity"}
            </span>
            <input
              type="number"
              value={quantity}
              disabled={
                user && user.userType === "coach" && team_count !== null
                  ? true
                  : false
              }
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
              style={{ width: "60px" }}
            />
          </div>

          <Button
            className="btn_primary mt-4"
            onClick={() => my_swiper.slideNext()}
          >
            Next
          </Button>
        </SwiperSlide>

        {product && product.layouts && product.layouts.length > 0 && (
          <SwiperSlide className={styles.slide_left}>
            <Card className={`${styles.crd_size} shadow`}>
              <Card.Body>
                <span className="d-block fs-5">Select Layout</span>
                <Container fluid>
                  <Row>
                    {product &&
                      product.layouts &&
                      product.layouts.map((l) => (
                        <Col
                          xs={
                            product.layouts.length <= 6
                              ? 6
                              : product.layouts.length <= 12
                              ? 4
                              : product.layouts.length <= 20
                              ? 3
                              : 2
                          }
                          key={l._id}
                        >
                          <div
                            className={`${styles.layout} ${
                              selectedLayout === l._id ? styles.active : ""
                            } h-100 d-flex justify-content-center align-items-center`}
                          >
                            <img
                              src={`${IMAGE_PATH}/small/${l.image}`}
                              className="img-fluid"
                              onClick={() =>
                                selectedLayout === l._id
                                  ? setSelectedLayout(null)
                                  : setSelectedLayout(l._id)
                              }
                            />
                          </div>
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            <Button
              className="btn_primary mt-2"
              onClick={() => my_swiper.slideNext()}
            >
              Next
            </Button>
          </SwiperSlide>
        )}
        {product &&
          selectedLayout &&
          product.fontImages &&
          product.fontImages.length > 0 && (
            <SwiperSlide className={styles.slide_left}>
              <Card className={`${styles.crd_size} shadow`}>
                <Card.Body>
                  <span className="d-block fs-5">Select Layout Font</span>
                  <Container fluid>
                    <Row>
                      {product &&
                        product.fontImages &&
                        product.fontImages.map((l, index) => (
                          <Col
                            xs={
                              product.fontImages
                                ? product.fontImages.length <= 6
                                  ? 6
                                  : product.fontImages.length <= 12
                                  ? 4
                                  : product.fontImages.length <= 20
                                  ? 3
                                  : 2
                                : 12
                            }
                            key={index}
                          >
                            <div
                              className={`${styles.layout} ${
                                selectedFont === product.fontImages[index]
                                  ? styles.active
                                  : ""
                              } h-100 d-flex justify-content-center align-items-center`}
                            >
                              <img
                                src={`${IMAGE_PATH}/small/${l}`}
                                className="img-fluid"
                                onClick={() =>
                                  selectedFont === product.fontImages[index]
                                    ? setSelectedFont(null)
                                    : setSelectedFont(product.fontImages[index])
                                }
                              />
                            </div>
                          </Col>
                        ))}
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
              <Button
                className="btn_primary mt-2"
                onClick={() => my_swiper.slideNext()}
              >
                Next
              </Button>
            </SwiperSlide>
          )}
        {selectedLayout && (
          <SwiperSlide className={styles.slide_left}>
            <Card className={`${styles.crd} shadow mt-4`}>
              <Card.Body className="d-flex justify-content-between flex-column">
                <span className="d-block fs-5">Layout Options</span>
                {/* <div
                  className={`d-flex justify-content-between flex-column pt-3 ${styles.font}`}
                >
                  <span className="d-block pb-2">Layout Font Family </span>
                  <FontPicker
                    apiKey={FONT_KEY}
                    activeFontFamily={activeFontFamily}
                    onChange={(nextFont) =>
                      setActiveFontFamily(nextFont.family)
                    }
                  />
                </div> */}
                <span className="d-block pt-3">Main Text</span>
                <input
                  type="text"
                  value={mainText}
                  className={`form-control mb-3`}
                  onChange={(e) => setMainText(e.target.value)}
                />
                <span className="d-block pt-2">Main Text Color</span>

                <Select
                  data={colors.map((c, i) => {
                    return {
                      label: c.name,
                      value: c.hex,
                    };
                  })}
                  itemComponent={({ value, label, ...others }) => (
                    <div className={styles.dd_item} ref={selectRef} {...others}>
                      <span className="d-flex align-items-center">
                        <BsSquareFill color={`${value}`} className="me-2" />{" "}
                        <span>{label}</span>
                      </span>
                    </div>
                  )}
                  placeholder="Pick team color"
                  value={mainTextColor ? mainTextColor : null}
                  onChange={(e) => {
                    setMainTextColor(e);
                  }}
                  required
                />
                <span className="d-block pt-3">Secondary Text</span>
                <input
                  type="text"
                  value={secondaryText}
                  className={`form-control mb-3`}
                  onChange={(e) => setSecondaryText(e.target.value)}
                />
                <span className="d-block pt-2">Secondary Text Color</span>
                <Select
                  data={colors.map((c, i) => {
                    return {
                      label: c.name,
                      value: c.hex,
                    };
                  })}
                  itemComponent={({ value, label, ...others }) => (
                    <div className={styles.dd_item} ref={selectRef} {...others}>
                      <span className="d-flex align-items-center">
                        <BsSquareFill color={`${value}`} className="me-2" />{" "}
                        <span>{label}</span>
                      </span>
                    </div>
                  )}
                  placeholder="Pick team color"
                  value={secondaryTextColor ? secondaryTextColor : null}
                  onChange={(e) => {
                    setSecondaryTextColor(e);
                  }}
                  required
                />
                {/* <select
                  value={secondaryTextColor}
                  onChange={(e) => setSecondaryTextColor(e.target.value)}
                  className={` form-control mb-3`}
                >
                  {colors.map((clr, i) => (
                    <option key={i} value={clr.name}>
                      {clr.name}
                    </option>
                  ))}
                </select> */}
              </Card.Body>
            </Card>
            <Button
              className="btn_primary "
              onClick={() => my_swiper.slideNext()}
            >
              Next
            </Button>
          </SwiperSlide>
        )}
        <SwiperSlide className={styles.slide_left}>
          <Card className={`${styles.crd} shadow mt-2`}>
            <Card.Body className="d-flex justify-content-between flex-column">
              <div
                className={`d-flex justify-content-between flex-column pb-2 ${styles.font}`}
              >
                <span className="d-block fs-5">Primary Color</span>
                <MultiSelect
                  data={colors.map((c, i) => {
                    return {
                      label: c.name,
                      value: c.hex,
                    };
                  })}
                  itemComponent={({ value, label, ...others }) => (
                    <div className={styles.dd_item} ref={selectRef} {...others}>
                      <span className="d-flex align-items-center">
                        <BsSquareFill color={`${value}`} className="me-2" />{" "}
                        <span>{label}</span>
                      </span>
                    </div>
                  )}
                  placeholder="Pick primary color"
                  value={orderColor}
                  onChange={(e) => {
                    if (e.length > 2) {
                      toast.error("You must select 2 colors");
                    } else if (e.length === 0) {
                      setOrderColor(e);
                    } else {
                      setOrderColor(e);
                    }
                  }}
                  required
                  clearable
                />
              </div>
              <small>Please select 2 primary color</small>
            </Card.Body>
          </Card>
          <Card className={`${styles.crd} shadow mt-3`}>
            <Card.Body className="d-flex justify-content-between flex-column">
              <div
                className={`d-flex justify-content-between flex-column pb-2 ${styles.font}`}
              >
                <span className="d-block fs-5">Secondary Color</span>
                <MultiSelect
                  data={colors.map((c, i) => {
                    return {
                      label: c.name,
                      value: c.hex,
                    };
                  })}
                  itemComponent={({ value, label, ...others }) => (
                    <div
                      className={styles.dd_item}
                      ref={selectRef2}
                      {...others}
                    >
                      <span className="d-flex align-items-center">
                        <BsSquareFill color={`${value}`} className="me-2" />{" "}
                        <span>{label}</span>
                      </span>
                    </div>
                  )}
                  placeholder="Pick secondary color"
                  value={orderColor2}
                  onChange={(e) => {
                    if (e.length > 2) {
                      toast.error("You can select maximum 2 colors");
                    } else {
                      setOrderColor2(e);
                    }
                  }}
                  clearable
                  multiple
                />
              </div>
            </Card.Body>
          </Card>
          <Card className={`${styles.crd_size} shadow`}>
            <Card.Body>
              <span className="d-block fs-5">Select Size</span>
              <div className={`${styles.grid_size} pt-3`}>
                {sizes &&
                  sizes.map((s) => (
                    <div
                      className={`${styles.size} ${
                        size === s && styles.active
                      } me-2`}
                      onClick={() => setSize(s)}
                    >
                      <span className="fs-5 d-block">{s}</span>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
          <Button
            className="btn_primary "
            onClick={() => my_swiper.slideNext()}
          >
            Next
          </Button>
          {/* FONT */}
        </SwiperSlide>
        <SwiperSlide className={styles.slide_left}>
          {/* <Card className={`${styles.crd} shadow mt-4`}>
            <Card.Body className="d-flex justify-content-between flex-column">
              <div
                className={`d-flex justify-content-between flex-column pt-3 ${styles.font}`}
              >
                <span className="d-block pb-2">Font for Custom Design</span>
                <FontPicker
                  apiKey={FONT_KEY}
                  activeFontFamily={orderFontFamily}
                  onChange={(nextFont) => setOrderFontFamily(nextFont.family)}
                />
              </div>
            </Card.Body>
          </Card> */}

          <Card className={`${styles.crd} shadow mt-3 mb-4`}>
            <Card.Body className="d-flex justify-content-between flex-column">
              {/* <span className="d-block fs-5 text-center">
                Order Description
              </span> */}
              <span className="d-block fs-5 text-center fw-bold">
                Enter Any additional information we might Have missed
              </span>
              <span className="d-block fs-6 text-center pb-3">
                Additional text, records and or athlete names
              </span>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.textarea} form-control mb-3`}
              ></textarea>
            </Card.Body>
          </Card>
          <Button onClick={submitHandeler} className={styles.btn}>
            Add To Cart
          </Button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  cart: state.cart.cart,
  team_count: state.cart.team_count,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setSize, addToCart, setTeamCount })(
  OrderDescription
);
