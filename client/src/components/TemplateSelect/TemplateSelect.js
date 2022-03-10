import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSelectedTemplate } from "../../actions/Landing.action";
import styles from "./TemplateSelect.module.scss";
import types from "../../config/ProductTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
import { getCategoryList } from "../../actions/Category.action";

const TemplateSelect = ({
  setSelectedTemplate,
  category,
  list,
  getCategoryList,
}) => {
  useEffect(() => {
    if (list.length === 0) {
      getCategoryList();
    }
    if (category === {}) {
      setSelectedTemplate(list[0]);
    }
  }, [list, category]);
  const navigate = useNavigate();
  return (
    <Container fluid className={styles.wrapper}>
      <Row className={`${styles.row}`}>
        <Col className="px-0" data-aos="fade-up">
          <div className={`text-center py-3 ${styles.preview}`}>
            <img
              src={`${IMAGE_PATH}small/${category.pngImage}`}
              className={styles.template}
              alt={category.name}
            />
            <span className="text-center fs-2 d-block text-dark  py-3">
              {category.name}
            </span>
          </div>
        </Col>
        <Col className={`${styles.templates_wrapper} px-0 text-white pb-5 `}>
          <span className="d-block fs-1 text-center text-dark py-4">
            Customize Now
          </span>
          {list.length > 0 && (
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
                setSelectedTemplate(list[swiper.activeIndex % list.length]);
              }}
              onSwiper={(swiper) => setSelectedTemplate(list[0])}
              centeredSlidesBounds={true}
              centeredSlides={true}
              centerInsufficientSlides={true}
              loop={true}
            >
              {list.map((item, i) => (
                <SwiperSlide key={i}>
                  <div
                    className={` d-flex justify-content-center align-items-center ${
                      styles.temp_item
                    } ${category._id === item._id ? styles.active : ""}`}
                  >
                    <img
                      src={`${IMAGE_PATH}small/${item.svgImage}`}
                      className={`img-fluid p-2`}
                      alt={item.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="text-center pt-5">
            <Button
              className={styles.btn}
              size="lg"
              onClick={() => navigate(`/category/${category._id}`)}
            >
              Browse Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  category: state.landing.template,
  list: state.landing.category,
});

export default connect(mapStateToProps, {
  setSelectedTemplate,
  getCategoryList,
})(TemplateSelect);
