import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import DashboardCompleted from "../../components/DashboardCompleted/DashboardCompleted";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
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
        <PaymentSuccess />
      </Layout>
    </div>
  );
};

export default DashboardPage;
