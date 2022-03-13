import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import SettingForm from "../../components/SettingForm/SettingForm";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Topbar />
      {/* <FilterDashboard /> */}
      <Sidebar />
      <Layout>
        <SettingForm />
      </Layout>
    </div>
  );
};

export default SettingsPage;
