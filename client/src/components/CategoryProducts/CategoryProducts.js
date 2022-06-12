import React from "react";
import styles from "./CategoryProducts.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Spinner } from "react-bootstrap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { IMAGE_PATH } from "../../constants/URL";
import { useNavigate } from "react-router-dom";

const CategoryProducts = ({ data, name }) => {
  const navigate = useNavigate();

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
          <h1>{name}</h1>
          <Swiper
            spaceBetween={0}
            className="mySwiper2 swiper-v"
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {data !== null && data.length > 0 ? (
              data.map((prod) => (
                <SwiperSlide className={styles.slide_left} key={prod._id}>
                  <>
                    <div className="">
                      <div className="text-center pt-4">
                        <img
                          src={`${IMAGE_PATH}small/${
                            prod.image?.front
                              ? prod.image.front
                              : prod.pngImageFront
                          }`}
                          className={styles.img}
                          alt=""
                        />
                      </div>
                      <div className="text-center">
                        <span className="d-block fs-4">{prod.name}</span>
                        <span className="d-block fs-5 text-secondary">
                          ${prod.priceArray?.price[0]}
                        </span>
                      </div>
                    </div>
                    <div className="text-center d-flex justify-content-center align-items-center">
                      <Button
                        size="lg"
                        className="btn_primary"
                        onClick={() => navigate(`/template/${prod._id}`)}
                      >
                        START
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

export default CategoryProducts;
