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
import { IMAGE_PATH } from "../../../constants/URL";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Moment from "react-moment";

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
  const [my_swiper, set_my_swiper] = useState({});

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
    // CART MODAL SHOW
    modals.openConfirmModal({
      title: "You Pay Before Approving The Design",
      centered: true,
      children: (
        <>
          <div className="text-center">
            <img
              src={`${IMAGE_PATH}small/${product.pngImageFront}`}
              className={styles.prev__img}
              alt="front"
            />
          </div>
          <Text size="md">
            <b>Note:</b> You pay before approving the design.
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

  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={0}
        className="mySwiper2 swiper-v"
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
        modules={[Pagination]}
      >
        <SwiperSlide className={`${styles.slide_left}`}>
          <ProductCard
            title={product.name}
            h
            img={`${IMAGE_PATH}small/${product.pngImageFront}`}
            id={product._id}
            template
            hidden={true}
            price={product.priceArray?.price[0]}
            noshadow
            notitle={true}
            discount={product.discount?.discount[0]}
          />
          <h3 className="pt-3">{product.name}</h3>
          <span className="d-block text-center text-secondary fs-6 pb-3">
            Added <Moment fromNow>{product.createdAt}</Moment>
          </span>

          <h4 className="pb-3">
            Sold : <span className="fw-normal">{product.sellCount}</span>{" "}
          </h4>
          {/* PRICE LIST */}
          <div className="text-center text-secondary fs-6 pb-3">
            {product.priceArray?.price.map((item, index) => {
              if (index === product.priceArray.price.length - 1) {
                return (
                  <span key={index}>
                    {" "}
                    {product.priceArray.price.length === 1
                      ? ""
                      : `/ ${product.priceArray.range[index - 1]}+`}{" "}
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
          <Button className="btn_primary" onClick={() => my_swiper.slideNext()}>
            Next
          </Button>
        </SwiperSlide>
        <SwiperSlide className={styles.slide_left}>
          <Card className={`${styles.crd_size} shadow`}>
            <Card.Body>
              <span className="d-block fs-4">Select Size</span>
              <div className={`${styles.grid_size} pt-3`}>
                {sizes &&
                  sizes.map((s, i) => (
                    <div
                      className={`${styles.size} ${
                        size === s && styles.active
                      } me-2`}
                      onClick={() => setSize(s)}
                      key={i}
                    >
                      <span className="fs-5 d-block">{s}</span>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>

          <div className="py-4 d-flex align-items-center justify-content-center">
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
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.user?.userType,
});

export default connect(mapStateToProps, { setSize, addToCart, switchMode })(
  OrderDescription
);
