import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Layout from "../../components/Shared/Layout/Layout";

const OrderTemplatePage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        <OrderDetails />
      </Layout>
    </div>
  );
};

export default OrderTemplatePage;
