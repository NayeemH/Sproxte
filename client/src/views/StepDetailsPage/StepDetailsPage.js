import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import StepDetails from "../../components/StepDetails/StepDetails";
import Layout from "../../components/Shared/Layout/Layout";
import { useParams } from "react-router-dom";
import {
  getProjectDetails,
  getStepDetails,
} from "../../actions/Project.action";
import { Spinner } from "react-bootstrap";

const StepDetailsPage = ({ step, getProjectDetails, getStepDetails, auth }) => {
  const { stepId, projectId } = useParams();
  useEffect(() => {
    if (auth === true) {
      if (stepId) {
        getStepDetails(stepId);
      }
      if (projectId) {
        getProjectDetails(projectId);
      }
    }
  }, [stepId, projectId, auth]);
  return (
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      {step === null ? (
        <div>
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <Layout title={step.name}>
          {" "}
          <StepDetails step={step} />
        </Layout>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: state.project.selected_step,
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getStepDetails, getProjectDetails })(
  StepDetailsPage
);
