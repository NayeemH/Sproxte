import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./HeroLanding.module.scss";
import TemplateSelect from "../TemplateSelect/TemplateSelect";
import { connect } from "react-redux";
import { getLandingList } from "../../actions/Landing.action";
import { IMAGE_PATH } from "../../constants/URL";

const HeroLanding = ({ list, getLandingList }) => {
  useEffect(() => {
    if (list.length === 0) {
      getLandingList();
    }
  }, [list]);
  return (
    <>
      <Container fluid>
        <Row className={styles.wrapper} data-aos="fade-down">
          <Col md={6} xs={12} className="py-md-5 py-3 px-md-3">
            <h1 className={styles.heading}>Sproxte</h1>
            <h1 className={`fs-1 fw-bolder ${styles.sub}`}>
              Work that we produce for our clients is always unique and unique
              to our clients.
            </h1>
            <span className="d-block lead pr-md-5 pt-3">
              Lorem Ipsum is simply dummy text of <br /> the printing and
              typesetting industry.
              <br /> Lorem Ipsum has been the industry's standard.
            </span>
            <Button variant="primary" className={`mt-3 ${styles.btn}`}>
              Register Now
            </Button>
          </Col>
        </Row>
      </Container>
      <TemplateSelect />
      <div className={`${styles.browse} pb-5`}>
        <Container>
          <Row>
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center pt-5 pb-3"
            >
              <h1 className={`gradient_title `}>Browse Products</h1>
            </Col>
            {list.length > 0 &&
              list.map((item) => (
                <Col md={3} key={item._id} className="p-2">
                  <ProductCard
                    title={item.name}
                    img={`${IMAGE_PATH}small/${item.pngImageFront}`}
                    id={item._id}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  list: state.landing.landing_list,
});

export default connect(mapStateToProps, { getLandingList })(HeroLanding);