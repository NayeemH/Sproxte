import React from "react";
import { Container } from "react-bootstrap";
import styles from "./RefundPolicy.module.scss";

const RefundPolicy = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text-center fw-light py-3 pt-5">Refund Policy</h1>
      <Container>
        <span className="d-block fs-4 fw-light text-center">
          Due to the custom nature of our products, Shirt App does not accept
          returns. At our discretion, a refund may be issued without requiring a
          return. In this situation, Shirt App does not take title to the
          refunded item.
        </span>
      </Container>
    </div>
  );
};

export default RefundPolicy;
