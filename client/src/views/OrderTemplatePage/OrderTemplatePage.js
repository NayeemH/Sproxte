import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Layout from "../../components/Shared/Layout/Layout";

const OrderTemplatePage = () => {
  const { id } = useParams();
  useEffect(() => {
    // FETCH ORDER DETAILS
  }, [id]);
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

export default OrderTemplatePage;
