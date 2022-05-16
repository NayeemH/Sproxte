import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCreative } from "swiper";
import styles from "./LandingSlider.module.scss";
import logo from "../../assets/logoLg.png";

import demoImg from "../../assets/templates/long.png";

const LandingSlider = () => {
  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={0}
        className="mySwiper2 swiper-v"
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
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
            <SwiperSlide className={styles.slide_top}>
              <div className="d-flex justify-content-start align-items-center d-md-none d-block">
                <img src={logo} className={styles.logo} alt="demo" />
              </div>
              <div className="">
                <div className="text-center pt-4">
                  <img src={demoImg} className={styles.img} alt="" />
                </div>
                <div className="text-center">
                  <span className="d-block fs-4">New T shirt</span>
                  <span className="d-block fs-5 text-secondary">$20</span>
                </div>
              </div>
              <div className="text-center d-flex justify-content-center align-items-center">
                <Button size="lg" className="btn_primary">
                  {" "}
                  START{" "}
                </Button>
              </div>
              <div className={styles.off}>
                <h6 className={styles.vc}>20% OFF</h6>
              </div>
              <div className={styles.bottom_nav}>
                <span className="d-block text-secondary">
                  <HiOutlineArrowNarrowLeft />
                </span>
                <span className="d-block fs-6 text-secondary">
                  More Tshirt Designs
                </span>
                <span className="d-block text-secondary">
                  <HiOutlineArrowNarrowRight />
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide 1
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide 2
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide3
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide 4
            </SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide className={styles.slide_left}>
          <Swiper
            className="mySwiper swiper-h"
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, EffectCreative]}
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
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide 2
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide3
            </SwiperSlide>
            <SwiperSlide className={styles.slide_top}>
              Vertical Slide 4
            </SwiperSlide>
          </Swiper>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LandingSlider;
