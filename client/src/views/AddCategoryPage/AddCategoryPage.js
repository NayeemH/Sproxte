import React from "react";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import Layout from "../../components/Shared/Layout/Layout";

const AddCategoryPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout>
        <AddCategoryForm />
      </Layout>
    </div>
  );
};

export default AddCategoryPage;
