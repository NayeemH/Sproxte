import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Spinner } from "react-bootstrap";
import styles from "./ApprovedCards.module.css";
import GridItemApprove from "./GridItemApprove/GridItemApprove";
import { fetchApprovedProject } from "../../actions/Dashboard.action";

const ApprovedCards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.approved.approved_projects);
  const loading = useSelector((state) => state.approved.loading);

  useEffect(() => {
    dispatch(fetchApprovedProject());
  }, []);

  return (
    <Container fluid className={styles.wrapper}>
      {loading && (
        <div
          className="bg_dark d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      )}

      <Row xs={1} md={4} lg={4} className="g-4 py-4 mx-0">
        {data.map((item) => (
          <GridItemApprove item={item} key={item.id} />
        ))}
      </Row>
    </Container>
  );
};

export default ApprovedCards;
