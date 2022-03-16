import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import styles from "./NotificationList.module.scss";

const NotificationList = () => {
  const item = [
    {
      _id: 1,
      type: "success",
      message: "Uploaded new preview file for you.",
      productId: "623178223dc088440565bebc",
      projectId: "623178213dc088440565beb9",
      createdAt: "2022-03-16T05:39:46.282Z",
    },
    {
      _id: 2,
      type: "success",
      message: "Project Completed.",
      projectId: "623178213dc088440565beb9",
      createdAt: "2022-03-16T05:39:46.282Z",
    },
    {
      _id: 3,
      type: "success",
      message: "Product Approved.",
      productId: "623178223dc088440565bebc",
      createdAt: "2022-03-16T05:39:46.282Z",
    },
    {
      _id: 4,
      type: "success",
      message: "Product Status Changed.",
      productId: "623178223dc088440565bebc",
      projectId: "623178213dc088440565beb9",
      createdAt: "2022-03-16T05:39:46.282Z",
    },
    {
      _id: 5,
      type: "success",
      message: "Project Status Changed.",
      projectId: "623178213dc088440565beb9",
      createdAt: "2022-03-16T05:39:46.282Z",
    },
  ];
  return (
    <Container>
      <Card className="crd p-md-4 p-2">
        <Card.Body>
          {item.map((notification) => (
            <Row className="mb-3">
              <Col xs={2}>
                <Row>
                  <Col
                    xs={8}
                    className={`${styles.small} d-flex align-items-center`}
                  >
                    <Moment fromNow>{notification.createdAt}</Moment>
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
                <Link
                  to={`/${
                    notification.productId && notification.projectId
                      ? `dashboard/${notification.projectId}/${notification.productId}`
                      : notification.projectId
                      ? `dashboard`
                      : notification.productId
                      ? `dashboard/${notification.projectId}`
                      : ``
                  }`}
                  className={`d-block fw-bold ${styles.link}`}
                >
                  {notification.message}
                </Link>
                <span className="d-block fw-light text-secondary">
                  <Moment format="dddd, MMMM DD YYYY">
                    {notification.createdAt}
                  </Moment>
                </span>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationList;
