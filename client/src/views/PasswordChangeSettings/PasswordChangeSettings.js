import React from "react";
import PasswordSettings from "../../components/PasswordSettings/PasswordSettings";
import Layout from "../../components/Shared/Layout/Layout";

const PasswordChangeSettings = () => {
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Layout>
        <PasswordSettings />
      </Layout>
    </div>
  );
};

export default PasswordChangeSettings;
