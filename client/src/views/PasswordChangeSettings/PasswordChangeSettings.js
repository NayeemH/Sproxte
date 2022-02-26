import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import PasswordSettings from "../../components/PasswordSettings/PasswordSettings";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./PasswordChangeSettings.module.css";

const PasswordChangeSettings = () => {
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <FilterDashboard />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/settings" className={styles.bc_home}>
            Settings
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          Password Change
        </Breadcrumb.Item>
      </Breadcrumb>
      <PasswordSettings />
    </div>
  );
};

export default PasswordChangeSettings;
