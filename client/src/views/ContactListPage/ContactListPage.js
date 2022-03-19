import React from "react";
import ContactList from "../../components/ContactList/ContactList";
import Layout from "../../components/Shared/Layout/Layout";

const ContactListPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Contact Submissions">
        <ContactList />
      </Layout>
    </div>
  );
};

export default ContactListPage;
