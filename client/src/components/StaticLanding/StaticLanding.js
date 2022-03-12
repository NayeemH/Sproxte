import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import demoLanding from "../../assets/landing/demoLanding.png";
import dots from "../../assets/landing/dots.png";
import callToAction from "../../assets/landing/callToAction.png";
import styles from "./StaticLanding.module.scss";
import { connect } from "react-redux";
import { IMAGE_PATH } from "../../constants/URL";

const StaticLanding = ({ category }) => {
  return (
    <Container className="py-5">
      <span
        className="d-block px-5 pt-5 text-center fs-3 fw-bold"
        data-aos="fade-right"
      >
        Lorem Ipsum is simply dummy text of the printing and <br /> typesetting
        industry.
      </span>
      <Row>
        <Col md={6} data-aos="fade-left">
          <span className="d-block pt-5 pb-3 h3">Lorem, ipsum.</span>
          <span className="d-block pb-md-5 lead">
            Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit.
            Similique, excepturi. Quae, dolores quam! Ipsa, fugit!
          </span>
        </Col>
        <Col md={6} className="d-flex justify-content-end" data-aos="fade-up">
          <img src={dots} className={`img-fluid ${styles.dots}`} alt="" />
        </Col>
      </Row>
      <div className="pb-5" data-aos="fade-down">
        <img src={demoLanding} style={{ width: "90%" }} alt="" />
      </div>

      <Row className="pb-5">
        <Col md={12} className="px-md-5 px-0 pb-md-5 pb-4">
          <span
            className="d-block px-5 pt-5 text-center fs-3 fw-bold"
            data-aos="fade-left"
          >
            Lorem Ipsum is simply dummy text of the printing and <br />{" "}
            typesetting industry.
          </span>
          <span
            className="d-block px-5 text-center fs-6 text-secondary pt-3"
            data-aos="fade-right"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </span>
        </Col>
        {category.map((item, i) => (
          <Col
            md={3}
            className={`d-flex justify-content-center align-items-center flex-column`}
            key={item._id}
            data-aos="fade-up"
          >
            <div className={styles.cat_wrapper}>
              <img
                src={`${IMAGE_PATH}small/${item.svgImage}`}
                alt=""
                className="img fluid p-2"
              />
            </div>
            <span className="d-block text-center fs-6 text-secondary pt-3">
              {item.name}
            </span>
            <Link to={`/category/${item._id}`} className={styles.arrow}>
              <span>
                <AiOutlineArrowRight />
              </span>
            </Link>
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={6} className="" data-aos="fade-down">
          <img
            src={callToAction}
            className=" "
            style={{ width: "100%" }}
            alt=""
          />
        </Col>
        <Col md={6} className="p-5" data-aos="fade-up">
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

const mapStateToProps = (state) => ({
  category: state.landing.category,
});

export default connect(mapStateToProps, null)(StaticLanding);
