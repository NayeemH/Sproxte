import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Shared/Layout/Layout";
import UploadStepForm from "../../components/UploadStepForm/UploadStepForm";

const UploadStepImagePage = () => {
  const selectedStep = useSelector((state) => state.project.selected_step);
  const selectedProject = useSelector((state) => state.project.selected_step);
  return (
    <div className={`bg_dark text-dark`} style={{ minHeight: "100vh" }}>
      <Layout title={selectedProject.name}>
        <UploadStepForm />
      </Layout>
    </div>
  );
};

export default UploadStepImagePage;
