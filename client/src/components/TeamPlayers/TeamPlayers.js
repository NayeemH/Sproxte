import React from "react";
import styles from "./TeamPlayers.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Spinner } from "react-bootstrap";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { IMAGE_PATH } from "../../constants/URL";
import { useNavigate } from "react-router-dom";

const TeamPlayers = ({ team, type }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {team === null ? (
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
          <h1>{team.teamName}</h1>
          <Swiper
            spaceBetween={0}
            className="mySwiper2 swiper-v"
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {team !== null && team.products.length > 0 ? (
              team.products
                .filter((item) => item.typeId === type)
                .map((prod) => (
                  <SwiperSlide className={styles.slide_left} key={prod._id}>
                    <>
                      <div className="">
                        <div className="text-center pt-4">
                          <img
                            src={`${IMAGE_PATH}small/${
                              prod.finalImage
                                ? prod.finalImage
                                : prod.image?.front
                                ? prod.image.front
                                : prod.colorImage
                            }`}
                            className={styles.img}
                            alt=""
                          />
                        </div>
                        <div className="text-center pt-3">
                          <span className="d-block fs-4">{prod.name}</span>
                          <span className="d-block fs-5 text-secondary">
                            ${prod.priceArray?.price[0]}
                          </span>
                        </div>
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center pt-5">
                        <Button
                          size="lg"
                          className="btn_primary"
                          onClick={() => navigate(`/team/player/${prod._id}`)}
                        >
                          {" "}
                          START{" "}
                        </Button>
                      </div>
                      <div className={styles.off}>
                        {prod.discount > 0 ? (
                          <h6 className={styles.vc}>
                            {prod.discount?.discount[0]}% OFF
                          </h6>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  </SwiperSlide>
                ))
            ) : (
              <div>No Player Found</div>
            )}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default TeamPlayers;
