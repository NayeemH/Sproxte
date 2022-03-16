import React from "react";
import { useSelector } from "react-redux";
import StepDetails from "../../components/StepDetails/StepDetails";
import Layout from "../../components/Shared/Layout/Layout";

const StepDetailsPage = () => {
  const title = useSelector((state) => state.project.selected_step.name);
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Layout title={title}>
        {" "}
        <StepDetails />
      </Layout>
    </div>
  );
};

export default StepDetailsPage;
