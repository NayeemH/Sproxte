import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddProjectForm from "../../components/AddProjectForm/AddProjectForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./AddProjectPage.module.css";

const AddProjectPage = () => {
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Layout>
        <AddProjectForm />
      </Layout>
    </div>
  );
};

export default AddProjectPage;
