import React from "react";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import Layout from "../../components/Shared/Layout/Layout";
const AddUserPage = () => {
  return (
    <div className={`bg_dark text-dark`} style={{ minHeight: "100vh" }}>
      <Layout title="Add IEP">
        <AddUserForm />
      </Layout>
    </div>
  );
};

export default AddUserPage;
