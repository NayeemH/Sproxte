import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Spinner } from "react-bootstrap";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { connect } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCreative } from "swiper";
import styles from "./LandingSlider.module.scss";

import { getLandingData, getLandingList } from "../../actions/Landing.action";
import { IMAGE_PATH } from "../../constants/URL";
import { useNavigate } from "react-router-dom";

const LandingSlider = ({ data, getLandingData, templates, getLandingList }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (data === null) {
      getLandingData();
    }
    getLandingList();
  }, []);
  return (
    <div className={styles.wrapper}>
      {data === null ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: 800,
            minWidth: "50%",
            paddingLeft: "10%",
          }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
        <>
          <Swiper
            spaceBetween={0}
            className="mySwiper2 swiper-v"
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {data.map((cat) => (
              <SwiperSlide className={styles.slide_left} key={cat._id}>
                <Swiper
                  className="mySwiper swiper-h"
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectCreative]}
                  effect={"creative"}
                  creativeEffect={{
                    prev: {
                      shadow: true,
                      translate: [0, 0, -400],
                    },
                    next: {
                      translate: ["100%", 0, 0],
                    },
                  }}
                >
                  {cat.productType.length > 0 ? (
                    <>
                      {cat.productType.map((prod, i) => (
                        <SwiperSlide
                          className={styles.slide_top}
                          key={prod._id}
                        >
                          <div className="">
                            <div className="text-center pt-4">
                              <img
                                src={`${IMAGE_PATH}small/${prod.pngImageFront}`}
                                className={styles.img}
                                alt=""
                              />
                            </div>
                            <div className="text-center">
                              <span className="d-block fs-4">{prod.name}</span>
                              <span className="d-block fs-5 text-secondary">
                                ${prod.price}
                              </span>
                            </div>
                          </div>
                          <div className="text-center d-flex justify-content-center align-items-center">
                            <Button
                              size="lg"
                              className="btn_primary"
                              onClick={() => navigate(`/template/${prod._id}`)}
                            >
                              {" "}
                              START{" "}
                            </Button>
                          </div>
                          <div className={styles.off}>
                            {prod.discount > 0 ? (
                              <h6 className={styles.vc}>
                                {prod.discount}% OFF
                              </h6>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className={styles.bottom_nav}>
                            {i === 0 ? (
                              <>
                                <span className="d-block text-white">
                                  <HiOutlineArrowNarrowLeft />
                                </span>
                              </>
                            ) : (
                              <span className="d-block text-secondary">
                                <HiOutlineArrowNarrowLeft />
                              </span>
                            )}
                            <span className="d-block fs-6 text-secondary">
                              More {cat.name} Designs
                            </span>
                            {i === cat.productType.length - 1 ? (
                              <>
                                <span className="d-block text-white">
                                  <HiOutlineArrowNarrowRight />
                                </span>
                              </>
                            ) : (
                              <span className="d-block text-secondary">
                                <HiOutlineArrowNarrowRight />
                              </span>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </Swiper>
              </SwiperSlide>
            ))}
            {templates && templates.length > 0 ? (
              <SwiperSlide className={styles.slide_left}>
                <Swiper
                  className="mySwiper swiper-h"
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectCreative]}
                  effect={"creative"}
                  creativeEffect={{
                    prev: {
                      shadow: true,
                      translate: [0, 0, -400],
                    },
                    next: {
                      translate: ["100%", 0, 0],
                    },
                  }}
                >
                  {templates.map((temp, i) => (
                    <SwiperSlide className={styles.slide_top} key={temp._id}>
                      <div className="">
                        <div className="text-center pt-4">
                          <img
                            src={`${IMAGE_PATH}small/${temp.pngImageFront}`}
                            className={styles.img}
                            alt=""
                          />
                        </div>
                        <div className="text-center">
                          <span className="d-block fs-4">{temp.name}</span>
                          <span className="d-block fs-5 text-secondary">
                            ${temp.price}
                          </span>
                        </div>
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center">
                        <Button
                          size="lg"
                          className="btn_primary"
                          onClick={() => navigate(`/product/${temp._id}`)}
                        >
                          {" "}
                          START{" "}
                        </Button>
                      </div>
                      <div className={styles.off}>
                        {temp.discount > 0 ? (
                          <h6 className={styles.vc}>{temp.discount}% OFF</h6>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className={styles.bottom_nav}>
                        {i === 0 ? (
                          <>
                            <span className="d-block text-white">
                              <HiOutlineArrowNarrowLeft />
                            </span>
                          </>
                        ) : (
                          <span className="d-block text-secondary">
                            <HiOutlineArrowNarrowLeft />
                          </span>
                        )}
                        <span className="d-block fs-6 text-secondary">
                          More Ready Made Designs
                        </span>
                        {i === templates.length - 1 ? (
                          <>
                            <span className="d-block text-white">
                              <HiOutlineArrowNarrowRight />
                            </span>
                          </>
                        ) : (
                          <span className="d-block text-secondary">
                            <HiOutlineArrowNarrowRight />
                          </span>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperSlide>
            ) : (
              <></>
            )}
          </Swiper>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.landing.data,
  templates: state.landing.landing_list,
});

export default connect(mapStateToProps, { getLandingData, getLandingList })(
  LandingSlider
);
