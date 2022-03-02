import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import UploadStepForm from "../../components/UploadStepForm/UploadStepForm";
import styles from "./UploadStepImagePage.module.css";

const UploadStepImagePage = () => {
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
      <UploadStepForm />
    </div>
  );
};

export default UploadStepImagePage;
