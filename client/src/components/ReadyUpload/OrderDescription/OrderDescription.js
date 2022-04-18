import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCart, setSize } from "../../../actions/Cart.action";
import { toast } from "react-toastify";
import styles from "./OrderDescription.module.scss";
import { useNavigate } from "react-router-dom";
import { useModals } from "@mantine/modals";
import { switchMode } from "../../../actions/Coach.action";
import { Text } from "@mantine/core";

const OrderDescription = ({
  sizes,
  addToCart,
  product,
  role,
  switchMode,
  type,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState();
  const [mainText, setMainText] = useState(undefined);
  const [secondaryText, setSecondaryText] = useState(undefined);
  const [mainTextColor, setMainTextColor] = useState(undefined);
  const [secondaryTextColor, setSecondaryTextColor] = useState(undefined);
  const [selectedFileBack, setSelectedFile2] = useState();

  const navigate = useNavigate();
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
    if (role && role === "coach") {
      modals.openConfirmModal({
        title: "Switch to client mode",
        centered: true,
        children: (
          <Text size="md">
            You can not order a ready made product as a coach. Please switch to
            client mode and try again.
          </Text>
        ),
        labels: { confirm: "Switch to Client Mode", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () => switchMode("client"),
      });
      return;
    }
    if (quantity < 1) {
      toast.error("Please enter a valid quantity");
    } else if (!size) {
      toast.error("Please select size");
    } else {
      addToCart(
        undefined,
        size,
        undefined,
        undefined,
        mainText,
        secondaryText,
        mainTextColor,
        secondaryTextColor,
        selectedLayout,
        quantity,
        product,
        undefined,
        type && type === "link" ? "link" : "template"
      );
      resetlHandeler();
      setDescription("");
      navigate("/cart");
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

  return (
    <div className={styles.wrapper}>
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

const mapStateToProps = (state) => ({
  role: state.auth.user?.userType,
});

export default connect(mapStateToProps, { setSize, addToCart, switchMode })(
  OrderDescription
);
