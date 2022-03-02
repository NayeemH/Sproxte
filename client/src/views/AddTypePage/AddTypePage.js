import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddTypeForm from "../../components/AddTypeForm/AddTypeForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./AddTypePage.module.css";

const AddTypePage = () => {
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
        <Breadcrumb.Item className={styles.bc_name} active>
          Add Type
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddTypeForm />
    </div>
  );
};

export default AddTypePage;
