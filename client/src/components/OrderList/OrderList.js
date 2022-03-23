import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import styles from "./OrderList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getRunningOrders } from "../../actions/Payment.acton";
import { BsArrowRight } from "react-icons/bs";
import demoImg from "../../assets/logoSq.png";
import { IMAGE_PATH } from "../../constants/URL";
const queryString = require("query-string");

const OrderList = ({ item, getRunningOrders }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = parsed.page ? parseInt(parsed.page) : 1;
  useEffect(() => {
    getRunningOrders(page);
  }, [parsed.page]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/orders?page=${parseInt(i)}`}
          key={i}
          className={`${styles.link} ${
            (!parsed.page && i == 1) || parsed.page == i
              ? `${styles.disabled} ${styles.active}`
              : ""
          } `}
        >
          <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
            {i}
          </span>
        </Link>
      );
    }

    return pages;
  };
  return (
    <Container>
      {item === null ? (
        <div
          className="d-flex justify-content-center align-items-center crd"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : item && item.itemCount === 0 ? (
        <Card className="crd">
          <Card.Body>
            <h4 className="fw-normal text-center">No Completed Orders</h4>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="crd p-md-4 p-2">
            <Card.Body>
              {item &&
                item.items &&
                item.items.map((notification) => (
                  <Row className="mb-3 border-bottom pb-3">
                    <Col xs={2}>
                      <Row>
                        <Col
                          md={7}
                          className={`${styles.small} d-flex align-items-center flex-column`}
                        >
                          <div className={styles.img_wrapper}>
                            <img
                              src={`${IMAGE_PATH}small/${notification.userId.image}`}
                              alt=""
                              className={styles.img}
                            />
                          </div>
                          <span className="d-block text-center">
                            {notification.userId.name}
                          </span>
                        </Col>
                        <Col
                          xs={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={5}
                      className="d-flex justify-content-center-center flex-column"
                    >
                      <div className={`d-block fw-bold ${styles.lnk}`}>
                        Address : {notification.address}
                      </div>
                      <div className={`d-block ${styles.lnk}`}>
                        Phone : {notification.phone}
                      </div>
                      <span className="d-block fw-light text-secondary">
                        <Moment format="dddd, MMMM DD YYYY">
                          {notification.createdAt}
                        </Moment>
                      </span>
                    </Col>
                    <Col xs={4}>
                      <Row>
                        <Col
                          xs={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                        <Col
                          xs={8}
                          className="d-flex justify-content-center-center flex-column"
                        >
                          <div className={`d-block fw-bold ${styles.lnk}`}>
                            Price : ${notification.price}
                          </div>
                          <div
                            className={`d-block ${styles.lnk}`}
                            style={{ textTransform: "capitalize" }}
                          >
                            Status : {notification.deleveryStatus}
                          </div>
                          <Link
                            to={`/dashboard/order/${notification.projectId}`}
                            className={`${styles.lnk}`}
                          >
                            <BsArrowRight />
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </Card.Body>
          </Card>
          <Row>
            <Col
              className={`d-flex justify-content-end align-items-center py-4`}
            >
              {page !== -1 && (
                <div className="d-flex justify-content-end align-items-center">
                  {parsed.page > 1 ? (
                    <Link
                      to={`/orders?page=${page - 1}`}
                      className={`${styles.link} ${
                        parsed.page === 1 ? styles.disabled : ""
                      } ${styles.link_arrow}`}
                    >
                      <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                        <AiOutlineLeft />
                      </span>
                    </Link>
                  ) : (
                    <span
                      className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                    >
                      <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                        <AiOutlineLeft />
                      </span>
                    </span>
                  )}
                  {item && item.pageCount && item.pageCount > 0
                    ? getPages(item.pageCount)
                    : null}
                  {item && item.pageCount && page < item.pageCount ? (
                    <Link
                      to={`/orders?page=${page + 1}`}
                      className={`${styles.link} ${styles.link_arrow} ${
                        styles.link_arrow
                      } ${
                        parsed.page >= item.pageCount ? styles.disabled : ""
                      }`}
                    >
                      <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                        <AiOutlineRight />
                      </span>
                    </Link>
                  ) : (
                    <span
                      className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                    >
                      <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                        <AiOutlineRight />
                      </span>
                    </span>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  item: state.payment.running_orders,
});
export default connect(mapStateToProps, { getRunningOrders })(OrderList);
