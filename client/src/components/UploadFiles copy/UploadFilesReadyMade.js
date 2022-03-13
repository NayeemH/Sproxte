import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IMAGE_PATH } from "../../constants/URL";
import ProductCard from "../Shared/ProductCard/ProductCard";
import OrderDescription from "./OrderDescription/OrderDescription";
import styles from "./UploadFilesReadyMade.module.scss";

const UploadFilesReadyMade = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col md={5} className="py-md-5 py-3">
            <ProductCard
              title={product.name}
              img={`${IMAGE_PATH}small/${product.pngImageFront}`}
              id={product._id}
              template
              price={product.price}
              discount={product.discount}
            />
            {/* <span className="d-block fs-4 pt-3">
              Regular Price : {product.price}${" "}
              <span className="text-danger">(-{product.discount}% OFF)</span>
            </span>
            <span className="d-block fs-4 pt-2">
              Discounted Price :{" "}
              {(product.price * (100 - product.discount)) / 100}$
            </span> */}
          </Col>
          <Col md={7} className="py-md-5 py-3">
            <OrderDescription sizes={product.sizes} product={product} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadFilesReadyMade;
