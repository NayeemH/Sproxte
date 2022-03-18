import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import styles from "./UsersList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getUserList } from "../../actions/Payment.acton";
import { BsArrowRight } from "react-icons/bs";
import { IMAGE_PATH } from "../../constants/URL";
const queryString = require("query-string");

const UsersList = ({ item, getUserList, dashboard }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = parsed.page ? parseInt(parsed.page) : 1;
  useEffect(() => {
    getUserList(page);
  }, [parsed.page]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/users?page=${parseInt(i)}`}
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
      {!item || !item.pageCount ? (
        <div
          className="d-flex justify-content-center align-items-center crd"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end align-items-center flex-md-row flex-column pb-3">
            <div className="d-flex flex-column flex-md-row">
              <Button className={dashboard ? styles.active_btn : styles.btn}>
                User List
              </Button>
              <Link
                to="/users/iep"
                className={`${
                  !dashboard ? styles.active_btn : styles.btn
                } mt-3 mt-md-0`}
              >
                IEP List
              </Link>
            </div>
          </div>
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
                          className={`${styles.small} d-flex align-items-center flex-column justify-content-center`}
                        >
                          <div className={styles.img_wrapper}>
                            <img
                              src={`${IMAGE_PATH}small/${notification.image}`}
                              alt=""
                              className={styles.img}
                            />
                          </div>
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
                      xs={9}
                      className="d-flex justify-content-center-center flex-column"
                    >
                      <div className={`d-block fw-bold ${styles.lnk}`}>
                        Name : {notification.name}
                      </div>
                      <div className={`d-block ${styles.lnk}`}>
                        Email : {notification.email}
                      </div>
                      <span className="d-block fw-light text-secondary">
                        Address: {notification.address}
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
                      to={`/users?page=${page - 1}`}
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
                      to={`/users?page=${page + 1}`}
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
  item: state.dashboard.clients,
});
export default connect(mapStateToProps, { getUserList })(UsersList);
