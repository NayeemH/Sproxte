import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import PasswordSettings from "../../components/PasswordSettings/PasswordSettings";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./PasswordChangeSettings.module.css";

const PasswordChangeSettings = () => {
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Layout>
        <PasswordSettings />
      </Layout>
    </div>
  );
};

export default PasswordChangeSettings;
