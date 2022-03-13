import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

const DashboardPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Topbar />
      <Sidebar />
      {/* <FilterDashboard selectedFilter="active" /> */}

      <Layout>
        <Dashboard />
      </Layout>

      {/* <DashboardCards /> */}
    </div>
  );
};

export default DashboardPage;
