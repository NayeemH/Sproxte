import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./PaymentMethods.module.scss";
import visa from "../../assets/payments/visa.png";
import mastercard from "../../assets/payments/mastercard.png";
import maestro from "../../assets/payments/maestro.png";
import american from "../../assets/payments/american.png";
import carte from "../../assets/payments/carte.jpg";
import discover from "../../assets/payments/discover.png";
import union from "../../assets/payments/union.png";
import jcb from "../../assets/payments/jcb.png";

const PaymentMethods = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text-center fw-light py-3">Payment Methods</h1>
      <Container>
        <Row>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={visa} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={mastercard} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={maestro} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={american} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={carte} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={discover} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={jcb} className={styles.img} />
            </div>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <div className={styles.crd}>
              <img src={union} className={styles.img} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentMethods;
