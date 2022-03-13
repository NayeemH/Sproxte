import React from "react";
import AddTypeForm from "../../components/AddTypeForm/AddTypeForm";
import Layout from "../../components/Shared/Layout/Layout";

const AddTypePage = () => {
  return (
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <AddTypeForm />
      </Layout>
    </div>
  );
};

export default AddTypePage;
