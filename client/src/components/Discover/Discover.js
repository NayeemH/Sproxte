import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../Shared/ProductCard/ProductCard";
import img from "../../assets/templates/long.png";
import styles from "./Discover.module.scss";

const Discover = () => {
  return (
    <div className={styles.wrapper}>
      <Row className={styles.list_row}>
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center pb-3"
        >
          <span className="d-block fs-3 text-light fw-light">
            FEATURED TEMPLATES
          </span>
          <Link to="/" className={styles.link}>
            <span className="fw-light fs-3">
              <AiOutlineRight />
            </span>
          </Link>
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
      </Row>
      <Row className={styles.list_row}>
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center pb-3"
        >
          <span className="d-block fs-3 text-light fw-light">
            POPULAR TEMPLATES
          </span>
          <Link to="/" className={styles.link}>
            <span className="fw-light fs-3">
              <AiOutlineRight />
            </span>
          </Link>
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
      </Row>
      <Row className={styles.list_row}>
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center pb-3"
        >
          <span className="d-block fs-3 text-light fw-light">
            ALL TEMPLATES
          </span>
          <Link to="/" className={styles.link}>
            <span className="fw-light fs-3">
              <AiOutlineRight />
            </span>
          </Link>
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
        <Col md={4} className="p-2">
          <ProductCard title="Extream Football" img={img} id={1} />
        </Col>
      </Row>
    </div>
  );
};

export default Discover;
