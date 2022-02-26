import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import SettingForm from "../../components/SettingForm/SettingForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
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
          Settings
        </Breadcrumb.Item>
      </Breadcrumb>
      <SettingForm />
    </div>
  );
};

export default SettingsPage;
