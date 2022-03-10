import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./DiscoverList.module.scss";
import { IMAGE_PATH } from "../../constants/URL";

const DiscoverList = ({ list, title, page, name }) => {
  return (
    <div className={styles.wrapper}>
      {list.items && list.items.length > 0 && (
        <Row className={styles.list_row}>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center pb-3 flex-md-row flex-column"
          >
            <div className="">
              <span className="d-block fs-3 fw-light">{title}</span>
            </div>
            {page !== -1 && (
              <div className="">
                {page > 1 ? (
                  <Link
                    to={`/discover/${name}?page=${parseInt(page) - 1}`}
                    className={`${styles.link} ${
                      page === 1 ? styles.disabled : ""
                    }`}
                  >
                    <span className="fw-light fs-3">
                      <AiOutlineLeft />
                    </span>
                  </Link>
                ) : (
                  <span className={styles.link}>
                    <span className="fw-light fs-3">
                      <AiOutlineLeft />
                    </span>
                  </span>
                )}
                <span className="">
                  <span className="fw-light fs-3">{page}</span>
                </span>
                {page < list.pageCount ? (
                  <Link
                    to={`/discover/${name}?page=${parseInt(page) + 1}`}
                    className={`${styles.link} ${
                      page >= list.pageCount ? styles.disabled : ""
                    }`}
                  >
                    <span className="fw-light fs-3">
                      <AiOutlineRight />
                    </span>
                  </Link>
                ) : (
                  <span className={styles.link}>
                    <span className="fw-light fs-3">
                      <AiOutlineRight />
                    </span>
                  </span>
                )}
              </div>
            )}
          </Col>
          {list.items &&
            list.items.map((item) => (
              <Col md={4} className="p-2">
                <ProductCard
                  template
                  title={item.name}
                  img={`${IMAGE_PATH}small/${item.pngImageFront}`}
                  id={item._id}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default DiscoverList;
