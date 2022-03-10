import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IMAGE_PATH } from "../../constants/URL";
import ProductCard from "../Shared/ProductCard/ProductCard";
import OrderDescription from "./OrderDescription/OrderDescription";
import styles from "./UploadFiles.module.scss";

const UploadFiles = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col md={6} className="py-md-5 py-3">
            <ProductCard
              title={product.name}
              img={`${IMAGE_PATH}small/${product.pngImageFront}`}
              id={product._id}
            />
          </Col>
          <Col md={6} className="py-md-5 py-3">
            <OrderDescription sizes={product.sizes} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadFiles;
