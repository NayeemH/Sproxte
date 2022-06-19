import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./DashboardTeamCompleted.module.scss";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { fetchTeamCompletedProjects } from "../../actions/Project.action";
const queryString = require("query-string");

const DashboardTeamCompleted = ({
  dashboard,
  projects,
  fetchTeamCompletedProjects,
}) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  let page = 1;
  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    fetchTeamCompletedProjects(page);
  }, [parsed.page]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/team-dashboard/completed?page=${parseInt(i)}`}
          imgLink={true}
          key={i}
          className={`${styles.link} ${
            (!parsed.page && i == 1) || parsed.page == i
              ? `${styles.disabled} ${styles.active}`
              : ""
          } `}
        >
          <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
            {i}
          </span>
        </Link>
      );
    }

    return pages;
  };

  return (
    <Container className={styles.wrapper}>
      <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
        <h3 className="pb-3">Completed Orders</h3>

        <div className="d-flex flex-column flex-md-row">
          <Link
            to="/team-dashboard"
            className={dashboard ? styles.active_btn : styles.btn}
            onClick={() => console.log("Active")}
          >
            Active Orders
          </Link>
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
                team={project.teamName}
                img={`${IMAGE_PATH}small/${project.image}`}
                description={project.createdAt}
                dashboard={`dashboard/order/${project._id}`}
                template
                Imgid={project._id}
                status={project.status}
                project={project}
              />
            </Col>
          ))}
      </Row>
      <Row>
        <Col className={`d-flex justify-content-end align-items-center py-4`}>
          {page !== -1 && (
            <div className="d-flex justify-content-end align-items-center">
              {parsed.page > 1 ? (
                <Link
                  to={`/team-dashboard/completed?page=${
                    parseInt(parsed.page) - 1
                  }`}
                  className={`${styles.link} ${
                    parsed.page === 1 ? styles.disabled : ""
                  } ${styles.link_arrow}`}
                >
                  <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                    <AiOutlineLeft />
                  </span>
                </Link>
              ) : (
                <span
                  className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                >
                  <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                    <AiOutlineLeft />
                  </span>
                </span>
              )}
              {projects.pageCount > 0 ? getPages(projects.pageCount) : null}
              {page < projects.pageCount ? (
                <Link
                  to={`/team-dashboard/completed?page=${
                    parseInt(parsed.page) + 1
                  }`}
                  className={`${styles.link} ${styles.link_arrow} ${
                    styles.link_arrow
                  } ${
                    parsed.page >= projects.pageCount ? styles.disabled : ""
                  }`}
                >
                  <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                    <AiOutlineRight />
                  </span>
                </Link>
              ) : (
                <span
                  className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                >
                  <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                    <AiOutlineRight />
                  </span>
                </span>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.team_approved_projects,
});

export default connect(mapStateToProps, { fetchTeamCompletedProjects })(
  DashboardTeamCompleted
);
