import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./Dashboard.module.scss";
import { getProjectDetails } from "../../actions/Project.action";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";

const OrderDetails = ({ dashboard, projects, getProjectDetails, data }) => {
  console.log(data);
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
        {projects.products &&
          projects.products.map((project) => (
            <Col key={project._id} md={3} className="p-3">
              <ProductCard
                title={project.name}
                img={`${IMAGE_PATH}small/${project.image}`}
                description={project.createdAt}
                dashboard={`dashboard/${
                  project.type === "template" ? "product" : "template"
                }/${project._id}`}
                status={project.type === "template" ? "ready made" : "template"}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.selected_project,
});

export default connect(mapStateToProps, { getProjectDetails })(OrderDetails);
