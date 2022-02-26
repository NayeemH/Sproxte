import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col, Spinner } from "react-bootstrap";
import styles from "./DashboardCards.module.css";
import GridItem from "./GridItem/GridItem";
import ListItem from "./ListItem/ListItem";
import { fetchProjects } from "../../actions/Project.action";

const DashboardCards = () => {
  const dispatch = useDispatch();
  const listGrid = useSelector((state) => state.dashboard.projectListGrid);
  const data = useSelector((state) => state.project.projects);
  const saved = useSelector((state) => state.project.fav_projects);
  const loading = useSelector((state) => state.project.loading);

  useEffect(() => {
    dispatch(fetchProjects());
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
      {data.filter((item) => saved.includes(item.id)).length > 0 && (
        <>
          {/* {data.filter((item) => saved.includes(item.id)).length > 0 && (
            <Row className="pt-3 text-light text-center">
              <Col xs={12}>
                <span className={styles.border_bottom}>Favorites</span>
              </Col>
            </Row>
          )} */}
          {listGrid === "grid" ? (
            <>
              <Row xs={1} md={4} lg={4} className="g-4 py-4 mx-0">
                {data
                  .filter((item) => saved.includes(item.id))
                  .map((item) => (
                    <GridItem item={item} key={item.id} star />
                  ))}
              </Row>
            </>
          ) : (
            data
              .filter((item) => saved.includes(item.id))
              .map((item) => <ListItem key={item.id} item={item} star />)
          )}
          <hr className={styles.hr} />
        </>
      )}
      {listGrid === "grid" ? (
        <Row xs={1} md={4} lg={4} className="g-4 py-4 mx-0">
          {data
            .filter((item) => !saved.includes(item.id))
            .map((item) => (
              <GridItem item={item} key={item.id} />
            ))}
        </Row>
      ) : (
        data
          .filter((item) => !saved.includes(item.id))
          .map((item) => <ListItem key={item.id} item={item} />)
      )}
    </Container>
  );
};

export default DashboardCards;
