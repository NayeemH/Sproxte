import React from "react";
import { connect } from "react-redux";
import { setSelectedTemplate } from "../../actions/Landing.action";
import styles from "./TemplateSelect.module.scss";
import types from "../../config/ProductTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TemplateSelect = ({ setSelectedTemplate, template }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <span className="text-center d-block text-white lead pt-4">
        {template.name}
      </span>
      <div className="text-center py-3">
        <img
          src={template.template}
          className={styles.template}
          alt={template.name}
        />
      </div>
      <Row>
        <Col className={`${styles.templates} text-white pb-5`}>
          <Swiper
            slidesPerView={1}
            slidesOffsetBefore={10}
            className={styles.templates}
            breakpoints={{
              300: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Navigation]}
            navigation={true}
            onSlideChange={(swiper) => {
              setSelectedTemplate(
                types[(swiper.activeIndex + 1) % types.length]
              );
            }}
            onSwiper={(swiper) => setSelectedTemplate(types[0])}
            centeredSlidesBounds={true}
            centeredSlides={true}
            centerInsufficientSlides={true}
            loop={true}
          >
            {types.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className={` d-flex justify-content-center align-items-center ${
                    styles.temp_item
                  } ${template.id === item.id ? styles.active : ""}`}
                >
                  {item.svg}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>
      <div className="text-center pb-4">
        <Button
          className={styles.btn}
          size="lg"
          variant="primary"
          onClick={() => navigate(`/order/${template.id}`)}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.landing.template,
});

export default connect(mapStateToProps, { setSelectedTemplate })(
  TemplateSelect
);
