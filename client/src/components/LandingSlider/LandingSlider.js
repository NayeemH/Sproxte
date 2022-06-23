import React, { useEffect, useState } from "react";
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

import {
  getLandingData,
  getLandingList,
  getTeamList,
} from "../../actions/Landing.action";
import { IMAGE_PATH } from "../../constants/URL";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

const LandingSlider = ({
  categories,
  getCategoryList,
  templates,
  getLandingList,
  teams,
  data,
  getTeamList,
}) => {
  const navigate = useNavigate();
  const [my_swiper, set_my_swiper] = useState({});
  const [my_swiper_ready, set_my_swiper_ready] = useState({});
  const [my_swiper_ready_team, set_my_swiper_ready_team] = useState({});
  const modals = useModals();
  useEffect(() => {
    getCategoryList();

    if (teams === null) {
      getTeamList();
    }
    getLandingList();
  }, []);

  const handleNavigate = (url) => {
    modals.openConfirmModal({
      title: "You pay before approval",
      centered: true,
      children: <Text size="md">You pay before approval.</Text>,
      labels: { confirm: "Continue", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => navigate(url),
    });
    return;
  };
  return (
    <div className={styles.wrapper}>
      {categories === [] ? (
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
                onInit={(ev) => {
                  set_my_swiper(ev);
                }}
              >
                {categories && categories.length > 0 ? (
                  <>
                    {categories.map((prod, i) => (
                      <SwiperSlide
                        className={`${styles.slide_top} ${styles.slide_bg}`}
                        style={{
                          background: `url(${IMAGE_PATH}small/${prod.pngImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                        key={prod._id}
                      >
                        {/* <div className={styles.teaser}>
                          <img
                            src={`${IMAGE_PATH}small/${prod.pngImage}`}
                            className={styles.img_teaser}
                            alt=""
                          />
                        </div> */}
                        <div
                          className={`text-center d-flex justify-content-end align-items-center flex-column ${styles.slider__content}`}
                        >
                          <div className={`d-flex flex-column pb-5`}>
                            <div className="text-center pb-3">
                              <span
                                className={`d-block fs-1 fw-bold gradient_title ${styles.prod_name}`}
                              >
                                {prod.name}
                              </span>
                            </div>
                            <Button
                              size="lg"
                              className="btn_primary"
                              onClick={() =>
                                handleNavigate(`/category/${prod._id}`)
                              }
                            >
                              {" "}
                              START{" "}
                            </Button>
                          </div>
                        </div>
                        <div className={styles.off}>
                          {prod.discount > 0 ? (
                            <h6 className={styles.vc}>{prod.discount}% OFF</h6>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className={`${styles.bottom_nav} ${styles.name__content} py-3`}
                        >
                          {i === 0 ? (
                            <>
                              <span className="d-block text-white">
                                <HiOutlineArrowNarrowLeft className="d-none" />
                              </span>
                            </>
                          ) : (
                            <span
                              className="d-block text-dark text-cursor"
                              onClick={() => my_swiper.slidePrev()}
                            >
                              <HiOutlineArrowNarrowLeft />
                            </span>
                          )}
                          <span className="d-block fs-6 text-dark fw-bold">
                            More Category Designs
                          </span>
                          {i === categories.length - 1 ? (
                            <>
                              <span className="d-block text-white">
                                <HiOutlineArrowNarrowRight className="d-none" />
                              </span>
                            </>
                          ) : (
                            <span
                              className="d-block  text-dark  text-cursor"
                              onClick={() => my_swiper.slideNext()}
                            >
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
                  onInit={(ev) => {
                    set_my_swiper_ready(ev);
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
                            ${temp.priceArray?.price[0]}
                          </span>
                        </div>
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center">
                        <Button
                          size="lg"
                          className="btn_primary"
                          onClick={() => handleNavigate(`/product/${temp._id}`)}
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
                          <span
                            className="d-block text-secondary  text-cursor"
                            onClick={() => my_swiper_ready.slidePrev()}
                          >
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
                          <span
                            className="d-block text-secondary  text-cursor"
                            onClick={() => my_swiper_ready.slideNext()}
                          >
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
            {/* TEAM START */}
            {teams && teams.length > 0 ? (
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
                  onInit={(ev) => {
                    set_my_swiper_ready_team(ev);
                  }}
                >
                  {teams.map((temp, i) => (
                    <SwiperSlide className={styles.slide_top} key={temp._id}>
                      <div className="">
                        <div className="text-center pt-4">
                          <img
                            src={`${IMAGE_PATH}small/${temp.logo}`}
                            className={styles.img}
                            alt=""
                          />
                        </div>
                        <div className="text-center">
                          <span className="d-block fs-4">{temp.teamName}</span>
                        </div>
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center">
                        <Button
                          size="lg"
                          className="btn_primary"
                          onClick={() => handleNavigate(`/team/${temp._id}`)}
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
                          <span
                            className="d-block text-secondary  text-cursor"
                            onClick={() => my_swiper_ready_team.slidePrev()}
                          >
                            <HiOutlineArrowNarrowLeft />
                          </span>
                        )}
                        <span className="d-block fs-6 text-secondary">
                          More Team Designs
                        </span>
                        {i === teams.length - 1 ? (
                          <>
                            <span className="d-block text-white">
                              <HiOutlineArrowNarrowRight />
                            </span>
                          </>
                        ) : (
                          <span
                            className="d-block text-secondary text-cursor"
                            onClick={() => my_swiper_ready_team.slideNext()}
                          >
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
            {/* TEAM END */}
          </Swiper>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.landing.category,
  templates: state.landing.landing_list,
  teams: state.landing.teams,
});

export default connect(mapStateToProps, {
  getCategoryList,
  getLandingList,
  getTeamList,
})(LandingSlider);
