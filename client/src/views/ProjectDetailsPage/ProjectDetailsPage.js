import React, { useEffect } from "react";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/Project.action";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ProjectDetailsPage.module.css";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.selected_project);
  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, [id]);
  return (
    <div
      className={`bg_dark text-light`}
      style={{ minHeight: "100vh", paddingBottom: "2.5rem" }}
    >
      <Topbar />
      <FilterDashboard />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Projects
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {project.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      {project === {} || project._id !== id ? (
        <div
          className="bg_dark d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <ProjectDetails project={project} />
      )}
    </div>
  );
};

export default ProjectDetailsPage;
