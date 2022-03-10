import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCart, setSize } from "../../../actions/Cart.action";
import { ImUpload } from "react-icons/im";
import { toast } from "react-toastify";
import styles from "./OrderDescription.module.scss";
import colors from "../../../config/Colors";

const OrderDescription = ({ sizes, addToCart }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState();
  const [selectedLayout, setSelectedLayout] = useState(true);
  const [mainText, setMainText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [mainTextColor, setMainTextColor] = useState("");
  const [secondaryTextColor, setSecondaryTextColor] = useState("");
  const fileRef = useRef();

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
      } else {
        addToCart(description, size, selectedFile);
        resetlHandeler();
        setDescription("");
      }
    }
  };

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
  return (
    <div className={styles.wrapper}>
      <Card className={`${styles.crd} shadow`}>
        <Card.Body>
          <Row>
            <Col>
              <span className="d-block fs-4">Upload Images</span>

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
        </Card.Body>
      </Card>
      <Card className={`${styles.crd_size} shadow`}>
        <Card.Body>
          <span className="d-block fs-4">Select Size</span>
          <div
            className="d-flex justify-content-between align-items-center pt-3"
            style={{ maxWidth: 300, maxHeight: 200 }}
          >
            {sizes.map((s) => (
              <div
                className={`${styles.size} ${size === s && styles.active}`}
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
      <Card className={`${styles.crd} shadow mt-4`}>
        <Card.Body className="d-flex justify-content-between flex-column">
          <span className="d-block fs-4">Layout Options</span>
          <span className="d-block pt-3">Main Text</span>
          <input
            type="text"
            className={`${styles.textarea} form-control mb-3`}
            onChange={(e) => setMainText(e.target.value)}
          />
          <span className="d-block pt-2">Main Text Color</span>
          <select
            value={mainTextColor}
            onChange={(e) => setMainTextColor(e.target.value)}
            className={` form-control mb-3`}
          >
            {colors.map((clr) => (
              <option value={clr.name}>{clr.name}</option>
            ))}
          </select>
          <span className="d-block pt-3">Secondary Text</span>
          <input
            type="text"
            value={secondaryText}
            className={`${styles.textarea} form-control mb-3`}
            onChange={(e) => setSecondaryText(e.target.value)}
          />
          <span className="d-block pt-2">Main Text Color</span>
          <select
            value={secondaryTextColor}
            onChange={(e) => setSecondaryTextColor(e.target.value)}
            className={` form-control mb-3`}
          >
            {colors.map((clr) => (
              <option value={clr.name}>{clr.name}</option>
            ))}
          </select>
        </Card.Body>
      </Card>
      <div className="py-3"></div>
      <Button onClick={submitHandeler} className={styles.btn}>
        Add To Cart
      </Button>
    </div>
  );
};

export default connect(null, { setSize, addToCart })(OrderDescription);
