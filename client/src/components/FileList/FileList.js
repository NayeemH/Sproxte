import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./FileList.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getIepList } from "../../actions/Payment.acton";
import { IMAGE_PATH } from "../../constants/URL";
import { deleteUser } from "../../actions/Dashboard.action";
import { BsTrash } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import ModalCard from "../Shared/ModalCard/ModalCard";
import { toast } from "react-toastify";
import { getFileList } from "../../actions/Project.action";
import Moment from "react-moment";
const queryString = require("query-string");

const FileList = ({ data, getFileList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getFileList();
  }, []);

  return (
    <Container>
      {data === null ? (
        <div
          className="d-flex justify-content-center align-items-center crd"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : data && data.length === 0 ? (
        <Card className="crd">
          <Card.Body>
            <h4 className="fw-normal text-center">No Files</h4>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="crd p-md-4 p-2">
            <Card.Body>
              {data &&
                data.map((notification) => (
                  <Row
                    className="mb-3 border-bottom pb-3"
                    key={notification._id}
                  >
                    <Col
                      xs={2}
                      className="d-flex justify-content-center align-items-start flex-column"
                    >
                      <span className="d-block">
                        <span className="fw-bold">Date: </span>
                        <Moment format="DD-MMMM-YYYY">
                          {notification.createdAt}
                        </Moment>
                      </span>
                      <span className="d-block">
                        <span className="fw-bold">Time:</span>
                        <Moment format=" hh:MM A">
                          {notification.createdAt}
                        </Moment>
                      </span>
                    </Col>
                    <Col xs={8}>
                      {notification.files.map((file, i) => (
                        <a
                          href={`${IMAGE_PATH}small/${file}`}
                          target="_blank"
                          key={i}
                          className={styles.file}
                        >
                          {i + 1}. {file}
                        </a>
                      ))}
                    </Col>
                    <Col
                      xs={2}
                      className="d-flex justify-content-center align-items-center flex-column"
                    >
                      <Button
                        classname="btn_primary"
                        onClick={() =>
                          navigate(
                            `/dashboard/${notification.projectId}/${notification.productId}`
                          )
                        }
                      >
                        View Order
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  data: state.dashboard.files,
});
export default connect(mapStateToProps, { getFileList, deleteUser })(FileList);
