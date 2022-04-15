import React from "react";
import DashboardTeam from "../../components/DashboardTeam/DashboardTeam";
import { DashboardTeamCompleted } from "../../components/DashboardTeamCompleted";
import Layout from "../../components/Shared/Layout/Layout";

const DashboardTeamPage = ({ completed }) => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        {!completed ? <DashboardTeam /> : <DashboardTeamCompleted dashboard />}
      </Layout>
    </div>
  );
};

export default DashboardTeamPage;
