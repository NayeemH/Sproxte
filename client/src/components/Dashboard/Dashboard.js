import React from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import demoImg from "../../assets/templates/long.png";
import styles from "./Dashboard.module.scss";

const Dashboard = ({ dashboard }) => {
  const CardItem = (
    <Col md={3} className="p-3">
      <ProductCard
        title="Demo Project"
        img={demoImg}
        description="2-03-2022"
        order
        id={2}
        status="Active"
      />
    </Col>
  );
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
        {CardItem}
        {CardItem}
        {CardItem}
        {CardItem}
        {CardItem}
        {CardItem}
      </Row>
    </Container>
  );
};

export default Dashboard;
