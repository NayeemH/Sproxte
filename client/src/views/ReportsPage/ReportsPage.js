import React from "react";
import Reports from "../../components/Reports/Reports";
import Layout from "../../components/Shared/Layout/Layout";

const ReportsPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout title="Reports">
        <Reports />
      </Layout>
    </div>
  );
};

export default ReportsPage;
