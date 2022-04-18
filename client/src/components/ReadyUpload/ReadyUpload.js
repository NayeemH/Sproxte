import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IMAGE_PATH } from "../../constants/URL";
import ProductCard from "../Shared/ProductCard/ProductCard";
import OrderDescription from "./OrderDescription/OrderDescription";
import styles from "./ReadyUpload.module.scss";

const ReadyUpload = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col md={5} className="py-md-5 py-3">
            <ProductCard
              title={product.name}
              img={`${IMAGE_PATH}small/${product.pngImageFront}`}
              id={product._id}
              price={product.price}
              discount={product.discount}
            />
          </Col>
          <Col md={7} className="py-md-5 py-3">
            <h4>
              Sold : <span className="fw-normal">{product.sellCount}</span>{" "}
            </h4>
            <OrderDescription sizes={product.sizes} product={product} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReadyUpload;
