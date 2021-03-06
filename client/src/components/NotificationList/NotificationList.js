import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getNotifications } from "../../actions/Notification.action";
import styles from "./NotificationList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IMAGE_PATH } from "../../constants/URL";
const queryString = require("query-string");

const NotificationList = ({ item, getNotifications }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = parsed.page ? parseInt(parsed.page) : 1;
  useEffect(() => {
    getNotifications(page);
  }, [parsed.page]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          key={i}
          to={`/notification?page=${parseInt(i)}`}
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
            <h4 className="fw-normal text-center">No notification</h4>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="crd p-md-4 p-2">
            <Card.Body>
              {item &&
                item.items &&
                item.items.map((notification, i) => (
                  <Row className={`mb-3 ${styles.brd}`} key={i}>
                    <Col md={2}>
                      <Row>
                        <Col
                          md={8}
                          className={`${styles.small} d-flex align-items-center`}
                        >
                          <div className={styles.img_wrapper}>
                            {notification.user ? (
                              <img
                                src={`${IMAGE_PATH}small/${notification.user.image}`}
                                alt=""
                                className={styles.img}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </Col>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={9}
                      className="d-flex justify-content-center-center flex-column"
                    >
                      <Link
                        to={`/${
                          notification.productId && notification.projectId
                            ? `dashboard/${notification.projectId}/${notification.productId}`
                            : notification.projectId
                            ? `dashboard/order/${notification.projectId}`
                            : notification.productId
                            ? `dashboard/${notification.projectId}`
                            : `dashboard`
                        }`}
                        className={`d-block fw-bold ${styles.lnk}`}
                      >
                        {notification.message}{" "}
                        {notification.user ? (
                          <>
                            by{" "}
                            <span className={styles.username}>
                              {notification.user.name}
                            </span>
                          </>
                        ) : (
                          ``
                        )}
                      </Link>
                      <span className="d-block fw-light text-secondary">
                        <Moment format="DD-MM-YYYY hh:mm A">
                          {notification.createdAt}
                        </Moment>
                      </span>
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
                      to={`/notification?page=${page - 1}`}
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
                      to={`/notification?page=${page + 1}`}
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
  item: state.auth.notifications,
});
export default connect(mapStateToProps, { getNotifications })(NotificationList);
