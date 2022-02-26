import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { MdDownload } from "react-icons/md";
import styles from "./GridItemApprove.module.css";
import { IMAGE_PATH } from "../../../constants/URL";

import Users from "../Users/Users";

const GridItemApprove = ({ item }) => {
  const navigate = useNavigate();

  return (
    <>
      {item && (
        <Col>
          <Card bg="dark" text="light" className={styles.crd}>
            <Card.Img
              onClick={() => navigate(`/project/${item.id}`)}
              style={{ cursor: "pointer" }}
              variant="top"
              src={`${IMAGE_PATH}small/${item.image}`}
            />
            <Card.Body>
              <Card.Title
                onClick={() => navigate(`/project/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </Card.Title>
              <Card.Text className={styles.desc}>
                {item.description.substring(0, 35)}...
              </Card.Text>
              <Users item={item} />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
              <span
                className={styles.down}
                onClick={() => navigate(`/project/${item.id}/download`)}
              >
                <MdDownload /> Download
              </span>
              {item.notification > 0 && (
                <span className={styles.notification}>{item.notification}</span>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <span className={styles.id}>ID: {item.id.substring(0, 6)}</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      )}
    </>
  );
};

export default GridItemApprove;
