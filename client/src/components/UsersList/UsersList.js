import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import styles from "./UsersList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getUserList } from "../../actions/Payment.acton";
import { BsTrash } from "react-icons/bs";
import { IMAGE_PATH } from "../../constants/URL";
import ModalCard from "../Shared/ModalCard/ModalCard";
import { toast } from "react-toastify";
import { deleteUser } from "../../actions/Dashboard.action";
const queryString = require("query-string");

const UsersList = ({ item, getUserList, dashboard, deleteUser }) => {
  const [deleteModal, setDeleteModal] = useState(null);
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

  const deleteHandeler = async () => {
    let check = await deleteUser(deleteModal);
    if (check) {
      setDeleteModal(null);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Container>
      {deleteModal !== null ? (
        <ModalCard
          title={
            <>
              You are about to <br /> delete user.
            </>
          }
        >
          <div
            className="d-flex justify-content-center align-items-center pb-4"
            style={{ zIndex: 999999 }}
          >
            <Button
              className={`${styles.btn_modal} btn_primary mx-2 `}
              onClick={deleteHandeler}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              className={`${styles.btn_modal} btn_primary mx-2 `}
              onClick={() => setDeleteModal(null)}
            >
              Cancel
            </Button>
          </div>
        </ModalCard>
      ) : null}
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
            <h4 className="fw-normal text-center">No User</h4>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="crd p-md-4 p-2">
            <Card.Body>
              {item &&
                item.items &&
                item.items.map((notification) => (
                  <Row
                    className="mb-3 border-bottom pb-3"
                    key={notification._id}
                  >
                    <Col md={2}>
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
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={9}
                      className="d-flex justify-content-center flex-column"
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
                    <Col
                      md={1}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <div
                        className={`d-block fw-bold ${styles.delete}`}
                        onClick={() => setDeleteModal(notification._id)}
                      >
                        <BsTrash />
                      </div>
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
export default connect(mapStateToProps, { getUserList, deleteUser })(UsersList);
