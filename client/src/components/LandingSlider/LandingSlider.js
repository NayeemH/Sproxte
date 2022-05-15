import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCreative } from "swiper";
import styles from "./LandingSlider.module.scss";

const LandingSlider = () => {
  return (
    <div>
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
      </Swiper>
    </div>
  );
};

export default LandingSlider;
