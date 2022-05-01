import React from "react";
import PlayerRequestList from "../../components/PlayerRequestList/PlayerRequestList";
import Layout from "../../components/Shared/Layout/Layout";

const PlayerRequestPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Player Requests">
        <PlayerRequestList />
      </Layout>
    </div>
  );
};

export default PlayerRequestPage;
