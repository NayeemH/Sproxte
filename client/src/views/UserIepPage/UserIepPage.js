import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import Layout from "../../components/Shared/Layout/Layout";
import { IepList } from "../../components/IepList";

const UserIepPage = ({ iep }) => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title={`${iep ? "IEP List" : "Users"}`}>
        {iep ? <IepList dashboard /> : <UsersList />}
      </Layout>
    </div>
  );
};

export default UserIepPage;
