import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import StepDetails from "../../components/StepDetails/StepDetails";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./StepDetailsPage.module.css";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";

const StepDetailsPage = () => {
  const selectedStep = useSelector((state) => state.project.selected_step);
  const selectedProject = useSelector(
    (state) => state.project.selected_project
  );
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <FilterDashboard />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Dashboard
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to={`/project/${selectedProject._id}`}
            className={styles.bc_home}
          >
            {selectedProject.name}
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {selectedStep.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <StepDetails />
    </div>
  );
};

export default StepDetailsPage;
