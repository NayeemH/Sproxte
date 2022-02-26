import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AnimatedBG from "../shared/AnimatedBG/AnimatedBG";
import styles from "./ProjectInvitation.module.css";
import {
  createAccountExisting,
  getInvitedProjectDetails,
} from "../../actions/Project.action";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const queryString = require("query-string");

const ProjectInvitation = () => {
  const { id, status } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state.project.invited_project);
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    dispatch(getInvitedProjectDetails(id));
  }, [id]);

  const onAcceptHandeler = () => {
    toast.success("Project Accepted");
    //REDUX TODO
    if (status === "user") {
      dispatch(createAccountExisting(id));
      navigate(`/?email=${parsed.email}`);
    } else {
      navigate(`/create-account/${id}?email=${parsed.email}`);
    }
  };
  const onRejectHandeler = () => {
    toast.error("Project Rejected");
    //REDUX TODO
    console.log("Rejected");
  };

  return (
    <>
      <AnimatedBG />
      <div className={styles.wrapper}>
        <Card bg="dark" text="light" className={styles.crd}>
          <Card.Header className="d-flex justify-content-center align-items-center">
            <span className={styles.heading}>Project Invitation</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="text-center">
                <img
                  src={project.image}
                  alt={project.name}
                  className={styles.project_image}
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center pt-2">
                <h3 className={styles.project_name}>{project.name}</h3>
                <h3 className={styles.project_desc}>{project.description}</h3>
                <span className="d-block pt-4">
                  You have been invited to join this project. By joining this
                  project you accept our Terms & Conditions
                </span>
              </Col>
            </Row>
            <Row className="pb-3 pt-4">
              <Col className="d-flex justify-content-around align-items-center">
                <Button
                  variant="primary"
                  onClick={onAcceptHandeler}
                  className={`mr-4 ${styles.btn}`}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={onRejectHandeler}
                  className={`ml-4 ${styles.btn_reject}`}
                >
                  Reject
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ProjectInvitation;
