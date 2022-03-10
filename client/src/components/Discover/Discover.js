import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./Discover.module.scss";
import { getDiscover } from "../../actions/Landing.action";
import { IMAGE_PATH } from "../../constants/URL";

const Discover = ({ getDiscover, list }) => {
  useEffect(() => {
    getDiscover();
  }, []);
  return (
    <div className={styles.wrapper}>
      {list.feature && list.feature.length > 0 && (
        <Row className={styles.list_row}>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center pb-3"
          >
            <span className="d-block fs-3 fw-light">FEATURED TEMPLATES</span>
            <Link to="/discover/feature" className={styles.link}>
              <span className="fw-light fs-3">
                <AiOutlineRight />
              </span>
            </Link>
          </Col>
          {list.feature &&
            list.feature.map((item) => (
              <Col md={4} className="p-2">
                <ProductCard
                  title={item.name}
                  img={`${IMAGE_PATH}small/${item.pngImageFront}`}
                  id={item._id}
                />
              </Col>
            ))}
        </Row>
      )}

      {list.popular && list.popular.length > 0 && (
        <Row className={styles.list_row}>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center pb-3"
          >
            <span className="d-block fs-3 fw-light">POPULAR TEMPLATES</span>
            <Link to="/discover/popular" className={styles.link}>
              <span className="fw-light fs-3">
                <AiOutlineRight />
              </span>
            </Link>
          </Col>
          {list.popular &&
            list.popular.map((item) => (
              <Col md={4} className="p-2">
                <ProductCard
                  title={item.name}
                  img={`${IMAGE_PATH}small/${item.pngImageFront}`}
                  id={item._id}
                />
              </Col>
            ))}
        </Row>
      )}
      {list.recent && list.recent.length > 0 && (
        <Row className={styles.list_row}>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center pb-3"
          >
            <span className="d-block fs-3 fw-light">ALL TEMPLATES</span>
            <Link to="/discover/all" className={styles.link}>
              <span className="fw-light fs-3">
                <AiOutlineRight />
              </span>
            </Link>
          </Col>

          {list.recent &&
            list.recent.map((item) => (
              <Col md={4} className="p-2">
                <ProductCard
                  title={item.name}
                  img={`${IMAGE_PATH}small/${item.pngImageFront}`}
                  id={item._id}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.landing.discover,
});

export default connect(mapStateToProps, { getDiscover })(Discover);
