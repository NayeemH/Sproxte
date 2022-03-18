import React from "react";
import OrderList from "../../components/OrderList/OrderList";
import Layout from "../../components/Shared/Layout/Layout";

const OrdersListPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Running Orders">
        <OrderList />
      </Layout>
    </div>
  );
};

export default OrdersListPage;
