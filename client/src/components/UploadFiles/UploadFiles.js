import React from "react";
import { Col, Container, Row } from "react-bootstrap";
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
              img={product.template}
              id={product.id}
            />
          </Col>
          <Col md={6} className="py-md-5 py-3">
            <OrderDescription size={product.size ? product.size : "S"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadFiles;
