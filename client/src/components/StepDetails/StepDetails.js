import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getStepDetails } from "../../actions/Project.action";
import colors from "../../config/Colors";
import { IMAGE_PATH } from "../../constants/URL";
import Overview from "./Overview/Overview";
import Preview from "./Preview/Preview";
import { saveAs } from "file-saver";
import styles from "./StepDetails.module.scss";

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
          <Col xs={12}>
            <Button
              variant="primary"
              type="reset"
              onClick={() => console.log("Approve")}
              className={`${styles.btn} mx-md-3 mx-0`}
            >
              Approve
            </Button>
          </Col>
          <Col md={8}></Col>
          <Col md={4}>
            <Card className={`${styles.crd} shadow mb-4`}>
              <Card.Body>
                <h4>Order Details</h4>
                <img
                  src={`${IMAGE_PATH}small/${step.colorImage}`}
                  className="w-100"
                  alt=""
                />
                <hr />
                <Row className="">
                  <Col xs={6}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Size :</span> {step.size}
                    </span>
                  </Col>
                  <Col xs={6}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Price :</span> {step.price}
                    </span>
                  </Col>
                  <Col xs={6}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Discount :</span>{" "}
                      {step.discount}
                    </span>
                  </Col>
                  <Col xs={6}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Quantity :</span> {step.count}
                    </span>
                  </Col>
                  <Col xs={12}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Description :</span>{" "}
                      {step.description}
                    </span>
                  </Col>
                  <Col xs={12}>
                    <span className="d-block fs-5">
                      <span className="fw-bold">Images :</span>{" "}
                    </span>
                  </Col>

                  {step.frontImages &&
                    step.frontImages.map((img) => (
                      <Col xs={6}>
                        <img
                          onClick={() =>
                            saveAs(
                              `${IMAGE_PATH}small/${img}`,
                              `${step.name} ${img}`
                            )
                          }
                          src={`${IMAGE_PATH}small/${img}`}
                          className={`${styles.images} w-100`}
                        />
                      </Col>
                    ))}
                  {step.layoutImage && (
                    <>
                      <Col xs={12}>
                        <hr />
                        <span className="d-block fs-5">
                          <span className="fw-bold">Selected Layout:</span>{" "}
                        </span>
                      </Col>

                      <Col xs={12}>
                        <img
                          src={`${IMAGE_PATH}small/${step.layoutImage}`}
                          className={`${styles.images} w-100`}
                        />
                      </Col>
                      {step.primaryText && (
                        <Col xs={12}>
                          <span className="d-block fs-5">
                            <span className="fw-bold">Primary Text: </span>
                            {step.primaryText}
                          </span>
                        </Col>
                      )}
                      {step.primaryColor && (
                        <Col xs={12}>
                          <span className="d-flex fs-5 align-items-center">
                            <span className="fw-bold">Primary Color: </span>
                            {step.primaryColor} (
                            {
                              colors.filter(
                                (item) => step.primaryColor === item.name
                              )[0].hex
                            }
                            )
                            <div
                              className={styles.color}
                              style={{
                                background: `${
                                  colors.filter(
                                    (item) => step.primaryColor === item.name
                                  )[0].hex
                                }`,
                              }}
                            ></div>
                          </span>
                        </Col>
                      )}
                      {step.secondaryText && (
                        <Col xs={12}>
                          <span className="d-block fs-5">
                            <span className="fw-bold">Secondary Text: </span>
                            {step.secondaryText}
                          </span>
                        </Col>
                      )}
                      {step.secondaryColor && (
                        <Col xs={12}>
                          <span className="d-flex align-items-center fs-5">
                            <span className="fw-bold">Secondary Color: </span>
                            {step.secondaryColor} (
                            {
                              colors.filter(
                                (item) => step.secondaryColor === item.name
                              )[0].hex
                            }
                            )
                            <div
                              className={styles.color}
                              style={{
                                background: `${
                                  colors.filter(
                                    (item) => step.secondaryColor === item.name
                                  )[0].hex
                                }`,
                              }}
                            ></div>
                          </span>
                        </Col>
                      )}
                    </>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/* {selectedCollectionIndex >= 0 && (
            <Preview
              // data={step.collections[selectedCollectionIndex]}
              // length={step.collections.length}
              // index={selectedCollectionIndex}
              // collections={step.collections}
              projectId={projectId}
              feedbackActive={feedbackActive}
              setFeedbackActive={setFeedbackActive}
              showForm={showForm}
              setShowForm={setShowForm}
              points={points}
              setPoints={setPoints}
              hoverFB={hoverFB}
              setHoverFB={setHoverFB}
            />
          )}
          {selectedCollectionIndex >= 0 && (
            <Overview
              // collection={step.collections[selectedCollectionIndex]}
              // final={step.collections.length - 1 === selectedCollectionIndex}
              // index={selectedCollectionIndex}
              feedbackActive={feedbackActive}
              setFeedbackActive={setFeedbackActive}
              showForm={showForm}
              setShowForm={setShowForm}
              points={points}
              setPoints={setPoints}
              hoverFB={hoverFB}
              setHoverFB={setHoverFB}
            />
          )} */}
          {/* {step.collections.length === 0 && <Overview />} */}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: state.project.selected_step,
  // selectedCollectionIndex: state.project.selected_collection,
  loading: state.project.loading,
});

export default connect(mapStateToProps, { getStepDetails })(StepDetails);
