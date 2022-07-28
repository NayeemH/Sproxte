import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./FileList.module.scss";
import { useNavigate } from "react-router-dom";

import { IMAGE_PATH } from "../../constants/URL";

import { deleteUpload, getFileList } from "../../actions/Project.action";
import Moment from "react-moment";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

const FileList = ({ data, getFileList, deleteUpload }) => {
  const navigate = useNavigate();
  const modals = useModals();

  useEffect(() => {
    getFileList();
  }, []);

  const deleteHandeler = (id) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this file? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete File", cancel: "Cancel" },
      onConfirm: () => deleteUpload(id),
    });
  };

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
                    <Col xs={7}>
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
                      xs={3}
                      className="d-flex justify-content-around align-items-center "
                    >
                      <Button
                        classname="btn_primary"
                        variant="danger"
                        onClick={() => deleteHandeler(notification._id)}
                      >
                        Delete File
                      </Button>
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
export default connect(mapStateToProps, { getFileList, deleteUpload })(
  FileList
);
