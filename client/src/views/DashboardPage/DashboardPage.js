import React from "react";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
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
      <FilterDashboard selectedFilter="active" />

      <DashboardCards />
    </div>
  );
};

export default DashboardPage;
