import React from "react";
import SettingForm from "../../components/SettingForm/SettingForm";
import Layout from "../../components/Shared/Layout/Layout";

const SettingsPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout>
        <SettingForm />
      </Layout>
    </div>
  );
};

export default SettingsPage;
