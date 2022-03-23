import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCart, setSize } from "../../../actions/Cart.action";
import { ImUpload } from "react-icons/im";
import { toast } from "react-toastify";
import styles from "./OrderDescription.module.scss";
import colors from "../../../config/Colors";
import { IMAGE_PATH } from "../../../constants/URL";
import { useNavigate } from "react-router-dom";

const OrderDescription = ({ sizes, addToCart, product, color }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState();
  const [mainText, setMainText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [mainTextColor, setMainTextColor] = useState("Red");
  const [secondaryTextColor, setSecondaryTextColor] = useState("Red");
  const [selectedFileBack, setSelectedFile2] = useState();
  const fileRef = useRef();
  const navigate = useNavigate();

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
          "custom"
        );
        resetlHandeler();
        setDescription("");
        navigate("/cart");
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
      if (list[index].size > 2000000) {
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
    if (e.target.files[0].size > 2000000) {
      toast.error("File size is too big");
      return;
    }
    setSelectedFile2(e.target.files[0]);
  };
  return (
    <div className={styles.wrapper}>
      <Card className={`${styles.crd} shadow`}>
        <Card.Body>
          <Row>
            <Col>
              <span className="d-block fs-4">Upload Front Images</span>

              <div className="pt-3">
                <Button
                  variant="outline-dark"
                  onClick={() => fileRef.current.click()}
                >
                  <span className="d-block mr-4">
                    <ImUpload />
                  </span>{" "}
                  <span className="pl-3 d-block"> Upload Image</span>
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
            </Col>
            <Col>
              <div className={styles.preview}>
                {selectedFile && selectedFile.length > 0 ? (
                  <div className="text-center pb-3">
                    <img src={preview} alt="admin" className="img-fluid" />{" "}
                    {selectedFile.length > 1 ? (
                      <span className="d-block pt-2">
                        + {selectedFile.length - 1} more files selected
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <></>
                )}
              </div>
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
      <Card className={`${styles.crd_size} shadow`}>
        <Card.Body>
          <span className="d-block fs-4">Select Size</span>
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
      <Card className={`${styles.crd} shadow`}>
        <Card.Body className="d-flex justify-content-between flex-column">
          <span className="d-block fs-4">Order Description</span>
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
      {product && product.layouts && product.layouts.length > 0 && (
        <Card className={`${styles.crd_size} shadow`}>
          <Card.Body>
            <span className="d-block fs-4">Select Layout</span>
            <Container fluid>
              <Row>
                {product &&
                  product.layouts &&
                  product.layouts.map((l) => (
                    <Col xs={6}>
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
      )}
      {selectedLayout && (
        <Card className={`${styles.crd} shadow mt-4`}>
          <Card.Body className="d-flex justify-content-between flex-column">
            <span className="d-block fs-4">Layout Options</span>
            <span className="d-block pt-3">Main Text</span>
            <input
              type="text"
              value={mainText}
              className={`form-control mb-3`}
              onChange={(e) => setMainText(e.target.value)}
            />
            <span className="d-block pt-2">Main Text Color</span>
            <select
              value={mainTextColor}
              onChange={(e) => setMainTextColor(e.target.value)}
              className={` form-control mb-3`}
            >
              {colors.map((clr, i) => (
                <option key={i} value={clr.name}>
                  {clr.name}
                </option>
              ))}
            </select>
            <span className="d-block pt-3">Secondary Text</span>
            <input
              type="text"
              value={secondaryText}
              className={`form-control mb-3`}
              onChange={(e) => setSecondaryText(e.target.value)}
            />
            <span className="d-block pt-2">Main Text Color</span>
            <select
              value={secondaryTextColor}
              onChange={(e) => setSecondaryTextColor(e.target.value)}
              className={` form-control mb-3`}
            >
              {colors.map((clr, i) => (
                <option key={i} value={clr.name}>
                  {clr.name}
                </option>
              ))}
            </select>
          </Card.Body>
        </Card>
      )}
      <div className="py-4 d-flex align-items-center">
        <span className="fs-5 fw-bold me-3">Quantity</span>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
          style={{ width: "60px" }}
        />
      </div>
      <Button onClick={submitHandeler} className={styles.btn}>
        Add To Cart
      </Button>
    </div>
  );
};

export default connect(null, { setSize, addToCart })(OrderDescription);
