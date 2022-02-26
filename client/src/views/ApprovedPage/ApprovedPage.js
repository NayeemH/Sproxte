import React from "react";
import ApprovedCards from "../../components/ApprovedCards/ApprovedCards";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

const ApprovedPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Topbar />
      <Sidebar />
      <FilterDashboard selectedFilter="approved" />
      <ApprovedCards />
    </div>
  );
};

export default ApprovedPage;
