import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import DashboardCompleted from "../../components/DashboardCompleted/DashboardCompleted";
import Layout from "../../components/Shared/Layout/Layout";

const DashboardPage = ({ completed }) => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        {!completed ? <Dashboard /> : <DashboardCompleted dashboard />}
      </Layout>
    </div>
  );
};

export default DashboardPage;
