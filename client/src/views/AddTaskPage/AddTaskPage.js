import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./AddTaskPage.module.css";

const AddTaskPage = () => {
  const { id } = useParams();
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
            Projects
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/project/${id}`} className={styles.bc_home}>
            {selectedProject.name}
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          Add Task
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddTaskForm id={id} />
    </div>
  );
};

export default AddTaskPage;
