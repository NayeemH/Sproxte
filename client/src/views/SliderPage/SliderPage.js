import React from "react";
import BgList from "../../components/BgList/BgList";
import Layout from "../../components/Shared/Layout/Layout";

const SliderPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title="Background">
        <BgList />
      </Layout>
    </div>
  );
};

export default SliderPage;
