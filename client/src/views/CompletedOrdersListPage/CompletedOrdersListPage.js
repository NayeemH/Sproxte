import React from "react";
import { CompletedOrderList } from "../../components/CompletedOrderList";
import Layout from "../../components/Shared/Layout/Layout";

const CompletedOrdersListPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Completed Orders">
        <CompletedOrderList />
      </Layout>
    </div>
  );
};

export default CompletedOrdersListPage;
