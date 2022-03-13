import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./AddUserPage.module.css";

const AddUserPage = () => {
  return (
    <div className={`bg_dark text-dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <AddUserForm />
      </Layout>
    </div>
  );
};

export default AddUserPage;
