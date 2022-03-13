import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Layout from "../../components/Shared/Layout/Layout";

const DashboardPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
};

export default DashboardPage;
