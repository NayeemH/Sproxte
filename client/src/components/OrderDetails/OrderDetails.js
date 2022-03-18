import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./OrderDetails.module.scss";
import { getProjectDetails } from "../../actions/Project.action";
import { connect } from "react-redux";
import { IMAGE_PATH } from "../../constants/URL";
import statusList from "../../config/StatusList";

const OrderDetails = ({ projects, id, data }) => {
  const [status, setStatus] = useState("");
  return (
    <Container className={styles.wrapper}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span>Current Status: {data.status}</span>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className={`${styles.active_btn} mt-3 mt-md-0`}
            >
              {status === "" ? "Select Status" : status}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {statusList.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => setStatus(item.name)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {status === "" ? null : (
            <Button
              className={styles.btn}
              onClick={() => console.log("Active")}
            >
              Save
            </Button>
          )}
        </div>
      </div>

      <Row>
        {projects.products &&
          projects.products.map((project) => (
            <Col key={project._id} md={3} className="p-3">
              <ProductCard
                title={project.name}
                img={`${IMAGE_PATH}small/${
                  project.type === "custom"
                    ? project.colorImage
                    : project.image.front
                }`}
                description={project.createdAt}
                dashboard={`dashboard/${
                  project.type === "template" ? "product" : `${id}`
                }/${project._id}`}
                status={project.type === "template" ? "ready made" : "template"}
                bottom={project.status}
                tags={[`x${project.count}`, `$${project.price}`]}
                hidden={project.type === "template" ? true : false}
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
