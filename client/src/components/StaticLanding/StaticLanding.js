import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import demoLanding from "../../assets/landing/demoLanding.png";
import dots from "../../assets/landing/dots.png";
import callToAction from "../../assets/landing/callToAction.png";
import styles from "./StaticLanding.module.scss";

const StaticLanding = () => {
  return (
    <Container className="py-5">
      <span className="d-block px-5 pt-5 text-center fs-3 fw-bold">
        Lorem Ipsum is simply dummy text of the printing and <br /> typesetting
        industry.
      </span>
      <Row>
        <Col md={6}>
          <span className="d-block pt-5 pb-3 h3">Lorem, ipsum.</span>
          <span className="d-block pb-md-5 lead">
            Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit.
            Similique, excepturi. Quae, dolores quam! Ipsa, fugit!
          </span>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <img src={dots} className={`img-fluid ${styles.dots}`} alt="" />
        </Col>
      </Row>
      <div className="pb-5">
        <img src={demoLanding} style={{ width: "90%" }} alt="" />
      </div>

      <Row>
        <Col md={6} className="">
          <img
            src={callToAction}
            className=" "
            style={{ width: "100%" }}
            alt=""
          />
        </Col>
        <Col md={6} className="p-5">
          <h3>Lorem Ipsum is simply dummy text dummy text </h3>
          <span className="d-block py-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </span>
          <span className="d-block pb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <Button variant="primary" className={styles.btn}>
            Read More
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StaticLanding;
