import React from "react";
import NotificationList from "../../components/NotificationList/NotificationList";
import Layout from "../../components/Shared/Layout/Layout";

const NotificationPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Notifications">
        <NotificationList />
      </Layout>
    </div>
  );
};

export default NotificationPage;
