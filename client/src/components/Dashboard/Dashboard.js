import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import demoImg from "../../assets/templates/long.png";
import styles from "./Dashboard.module.scss";
import { fetchProjects } from "../../actions/Project.action";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
const queryString = require("query-string");

const Dashboard = ({ dashboard, projects, fetchProjects }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  let page = 1;
  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    fetchProjects(page);
  }, [parsed.page]);

  return (
    <Container className={styles.wrapper}>
      <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
        <h3 className="pb-3">Running Orders</h3>

        <div className="d-flex flex-column flex-md-row">
          <Button
            className={dashboard ? styles.active_btn : styles.btn}
            onClick={() => console.log("Active")}
          >
            Active Orders
          </Button>
          <Button
            className={`${
              !dashboard ? styles.active_btn : styles.btn
            } mt-3 mt-md-0`}
            onClick={() => console.log("completed")}
          >
            Completed Orders
          </Button>
        </div>
      </div>
      <Row>
        {projects.items &&
          projects.items.map((project) => (
            <Col key={project._id} md={3} className="p-3">
              <ProductCard
                title={project.name}
                img={`${IMAGE_PATH}small/${project.image}`}
                description={project.createdAt}
                order
                id={2}
                status={project.status}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
});

export default connect(mapStateToProps, { fetchProjects })(Dashboard);
