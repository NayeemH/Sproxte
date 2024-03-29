import React, { useEffect } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import ProductCard from "../Shared/ProductCard/ProductCard";
import styles from "./DashboardTeam.module.scss";
import { fetchTeamProjects } from "../../actions/Project.action";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import statusList from "../../config/StatusList";
const queryString = require("query-string");

const DashboardTeam = ({ dashboard, projects, fetchTeamProjects }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = queryString.parse(location.search);
  const status = parsed.status;

  let page = 1;
  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    fetchTeamProjects(page, parsed.status ? parsed.status : -1);
  }, [parsed.page, parsed.status]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/team-dashboard?${
            status !== "" && `status=${status}&`
          }page=${parseInt(i)}`}
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
        <h3 className="pb-3">Team Orders</h3>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3 pb-md-0">
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className={`${styles.active_btn} mt-3 mt-md-0`}
                style={{ textTransform: "capitalize" }}
              >
                {parsed.status ? parsed.status : "Select Status"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    navigate(
                      `/team-dashboard?page=${
                        parseInt(parsed.page) ? parseInt(parsed.page) : 1
                      }`
                    )
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  All
                </Dropdown.Item>
                {statusList.map((item) => (
                  <Dropdown.Item
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/team-dashboard?${
                          status !== "" && `status=${item.name}&`
                        }page=${
                          parseInt(parsed.page) ? parseInt(parsed.page) : 1
                        }`
                      )
                    }
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.name === "delivered"
                      ? "Delivered (to fedex)"
                      : item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row">
          <Button className={dashboard ? styles.active_btn : styles.btn}>
            Active Orders
          </Button>
          <Link
            to="/team-dashboard/completed"
            className={`${
              !dashboard ? styles.active_btn : styles.btn
            } mt-3 mt-md-0`}
            onClick={() => console.log("completed")}
          >
            Shipped Orders
          </Link>
        </div>
      </div>
      {projects.items &&
        projects.items.filter((item) => item.type === "team").length > 0 && (
          <Row>
            {projects.items &&
              projects.items
                .filter((item) => item.type === "team")
                .map((project) => (
                  <Col key={project._id} md={3} className="p-3">
                    <ProductCard
                      imgLink={true}
                      title={project.name}
                      team={project.teamName}
                      img={`${IMAGE_PATH}small/${project.image}`}
                      description={project.createdAt}
                      dashboard={`team-dashboard/order/${project._id}`}
                      template
                      Imgid={project._id}
                      status={project.status}
                      project={project}
                      products={project.products}
                    />
                  </Col>
                ))}
          </Row>
        )}

      <Row>
        <Col className={`d-flex justify-content-end align-items-center py-4`}>
          {page !== -1 && (
            <div className="d-flex justify-content-end align-items-center">
              {parsed.page > 1 ? (
                <Link
                  to={`/team-dashboard?${
                    status !== "" && `status=${status}&`
                  }page=${parseInt(parsed.page) - 1}`}
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
                  to={`/team-dashboard?${
                    status !== "" && `status=${status}&`
                  }page=${parseInt(parsed.page) + 1}`}
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
  projects: state.project.team_projects,
});

export default connect(mapStateToProps, { fetchTeamProjects })(DashboardTeam);
