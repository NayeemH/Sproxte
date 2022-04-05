import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import DashboardCompleted from "../../components/DashboardCompleted/DashboardCompleted";
import Layout from "../../components/Shared/Layout/Layout";
import TeamFormFill from "../../components/TeamFormFill/TeamFormFill";

const DashboardPage = ({ completed }) => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        {!completed ? <Dashboard /> : <DashboardCompleted dashboard />}
        <TeamFormFill />
      </Layout>
    </div>
  );
};

export default DashboardPage;
