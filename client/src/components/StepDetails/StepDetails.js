import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getStepDetails } from "../../actions/Project.action";
import Overview from "./Overview/Overview";
import Preview from "./Preview/Preview";
import styles from "./StepDetails.module.scss";
import ReactPannellum, {
  mouseEventToCoords,
  addHotSpot,
  lookAt,
  removeHotSpot,
} from "../../libs/react-pannelum";

const StepDetails = ({
  step,
  getStepDetails,
  loading,
  selectedCollectionIndex,
}) => {
  const { stepId, projectId } = useParams();

  const [feedbackActive, setFeedbackActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [points, setPoints] = useState(null);
  const [hoverFB, setHoverFB] = useState("");

  useEffect(() => {
    getStepDetails(stepId);
  }, [stepId]);

  return (
    <div className={styles.wrapper}>
      {(step === {} || step._id !== stepId) && loading === false ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Row>
          {selectedCollectionIndex >= 0 && (
            <Preview
              data={step.collections[selectedCollectionIndex]}
              length={step.collections.length}
              index={selectedCollectionIndex}
              collections={step.collections}
              projectId={projectId}
              feedbackActive={feedbackActive}
              setFeedbackActive={setFeedbackActive}
              showForm={showForm}
              setShowForm={setShowForm}
              points={points}
              setPoints={setPoints}
              hoverFB={hoverFB}
              setHoverFB={setHoverFB}
              ReactPannellum={ReactPannellum}
              mouseEventToCoords={mouseEventToCoords}
              lookAt={lookAt}
              addHotSpot={addHotSpot}
            />
          )}
          {selectedCollectionIndex >= 0 && (
            <Overview
              collection={step.collections[selectedCollectionIndex]}
              final={step.collections.length - 1 === selectedCollectionIndex}
              index={selectedCollectionIndex}
              feedbackActive={feedbackActive}
              setFeedbackActive={setFeedbackActive}
              showForm={showForm}
              setShowForm={setShowForm}
              points={points}
              setPoints={setPoints}
              hoverFB={hoverFB}
              setHoverFB={setHoverFB}
              lookAt={lookAt}
              removeHotSpot={removeHotSpot}
            />
          )}
          {step.collections.length === 0 && <Overview />}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: state.project.selected_step,
  selectedCollectionIndex: state.project.selected_collection,
  loading: state.project.loading,
});

export default connect(mapStateToProps, { getStepDetails })(StepDetails);
