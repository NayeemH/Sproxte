import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { approveStep, getStepDetails } from "../../actions/Project.action";
import colors from "../../config/Colors";
import { IMAGE_PATH } from "../../constants/URL";
import Overview from "./Overview/Overview";
import Preview from "./Preview/Preview";
import { saveAs } from "file-saver";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./StepDetails.module.scss";
import { toast } from "react-toastify";
import { useModals } from "@mantine/modals";
import { Text, TextInput } from "@mantine/core";
import { rejectOrder } from "../../actions/Order.action";
import Moment from "react-moment";
import { getPrice } from "../../utils/getPrice";

const StepDetails = ({
  step,
  loading,
  selectedCollectionIndex,
  role,
  approveStep,
  rejectOrder,
}) => {
  const { stepId, projectId } = useParams();

  const [feedbackActive, setFeedbackActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [points, setPoints] = useState(null);
  const [hoverFB, setHoverFB] = useState("");
  const modals = useModals();

  const rejectSubmitHandeler = async (e) => {
    e.preventDefault();
    let msg = e.target.elements[0].value;
    let image = e.target.elements[1]?.files[0];
    if (!msg) {
      toast.error("Please enter a message");
      return;
    }
    if (image && image.size > 2000000) {
      toast.error("Image size should be less than 2MB");
      return;
    }
    let checkReject = await rejectOrder(msg, image, stepId);

    if (checkReject) {
      modals.closeAll();
    }
  };

  const rejectHandeler = () => {
    modals.openModal({
      title: "Are you sure you want to reject this design?",
      centered: true,
      closeOnClickOutside: false,
      children: (
        <div style={{ zIndex: 99999 }}>
          <Text size="md">
            Please provide why you are rejecting this design and upload image
            for further reference.
          </Text>
          <Form className="py-3" onSubmit={rejectSubmitHandeler}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="fw-bold">
                Why you are rejecting this design?
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                placeholder="Please provide why you are rejecting this design briefly"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="fw-bold pt-3 mb-0">
                Upload image for further reference
              </Form.Label>
              <small className="d-block pb-2">
                This upload image is required.
              </small>
              <Form.Control type="file" required />
            </Form.Group>
            <Button className="btn_primary mt-3" type="submit">
              Reject
            </Button>
          </Form>
        </div>
      ),
      labels: { cancel: "Cancel" },
      onCancel: () => {},
    });
    return;
  };

  const showLink = (link) => {
    modals.openModal({
      title: "Share link",
      centered: true,
      closeOnClickOutside: false,
      children: (
        <div style={{ zIndex: 99999 }} className="pb-4">
          <TextInput readOnly label="URL" value={link} />
        </div>
      ),
      labels: { cancel: "Cancel" },
      onCancel: () => {},
    });
  };

  const getDiscount = (data) => {
    if (step.count < data.range[0]) {
      return data.discount[0];
    } else if (step.count > data.range[data.range.length - 1]) {
      return data.discount[data.discount.length - 1];
    } else {
      for (let i = 0; i < data.range.length; i++) {
        if (step.count >= data.range[i] && step.count <= data.range[i + 1]) {
          return data.discount[i + 1];
        }
      }
    }
  };

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
          {step.status !== "delivered" ? (
            <Col
              xs={12}
              className={`d-flex align-items-center flex-md-row flex-column pb-3`}
            >
              {step.status !== "approved" ? (
                <>
                  {role === "client" || role === "coach" ? (
                    <>
                      <Button
                        variant="primary"
                        type="reset"
                        onClick={() => approveStep(stepId, projectId)}
                        className={`${styles.btn} mx-md-3 mx-0`}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => rejectHandeler()}
                        className={`${styles.btn} mx-md-3 mx-0`}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}

                  {role === "admin" || role === "iep" ? (
                    <Link
                      to={`/dashboard/${projectId}/${stepId}/upload`}
                      variant="primary"
                      className={`${styles.btn} text-decoration-none `}
                    >
                      Upload New Image
                    </Link>
                  ) : null}
                </>
              ) : (
                <>
                  {selectedCollectionIndex >= 0 && (
                    <CopyToClipboard
                      text={`${window.location.origin}/share/${step._id}`}
                      onCopy={() =>
                        toast.success("Link copied to clipboard.") &&
                        showLink(`${window.location.origin}/share/${step._id}`)
                      }
                    >
                      <Button
                        variant="primary"
                        type="reset"
                        className={`${styles.btn} mx-md-3 mx-0`}
                      >
                        Share
                      </Button>
                    </CopyToClipboard>
                  )}
                </>
              )}
            </Col>
          ) : null}
          <Col md={role === "admin" || role === "iep" ? 8 : 12}>
            <Row className="pb-4">
              {step &&
              step._id &&
              step.collections &&
              selectedCollectionIndex >= 0 ? (
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
                />
              ) : (
                <></>
              )}
              {step &&
              step._id &&
              step.collections &&
              step.collections.length &&
              selectedCollectionIndex >= 0 ? (
                <Overview
                  collection={step.collections[selectedCollectionIndex]}
                  final={
                    step.collections.length - 1 === selectedCollectionIndex
                  }
                  index={selectedCollectionIndex}
                  feedbackActive={feedbackActive}
                  setFeedbackActive={setFeedbackActive}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  points={points}
                  setPoints={setPoints}
                  hoverFB={hoverFB}
                  setHoverFB={setHoverFB}
                  sellCount={step.sellCount}
                />
              ) : (
                <></>
              )}
              {step && step._id && step.collections.length === 0 ? (
                <Overview />
              ) : (
                <></>
              )}
            </Row>
            {step &&
            step._id &&
            step.gurdianNotifications &&
            step.gurdianNotifications.length > 0 ? (
              <Row className="text-dark">
                <Col md={12}>
                  <hr />
                  <h2>Uploads</h2>
                </Col>
                <Col md={12}>
                  {step &&
                    step._id &&
                    step.gurdianNotifications &&
                    step.gurdianNotifications.map((item, i) => (
                      <div className="crd crd-body p-3 my-3" key={i}>
                        <Row>
                          <Col>
                            <span className="d-block fs-5">{item.message}</span>
                            <span className="d-block fs-6 text-secondary">
                              <Moment format="hh:mm on DD MMMM YYYY ">
                                {item.createdAt}
                              </Moment>
                            </span>
                          </Col>
                          <Col className="text-end">
                            <img
                              src={`${IMAGE_PATH}small/${item.image}`}
                              alt=""
                              style={{ height: 50, cursor: "pointer" }}
                              onClick={() =>
                                saveAs(
                                  `${IMAGE_PATH}small/${item.image}`,
                                  `${step.name} - Upload [1]`
                                )
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    ))}
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </Col>
          {(role === "admin" || role === "iep") && step ? (
            <>
              <Col md={4}>
                <Card className={`${styles.crd} shadow mb-4`}>
                  <Card.Body>
                    <h4>Order Details</h4>
                    <img
                      src={`${IMAGE_PATH}small/${step.colorImage}`}
                      className={`${styles.images} w-100`}
                      alt=""
                      onClick={() =>
                        saveAs(
                          `${IMAGE_PATH}small/${step.colorImage}`,
                          `${step.name} - Template`
                        )
                      }
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
                          <span className="fw-bold">Price :</span> $
                          {step.priceArray
                            ? getPrice(step?.priceArray, step.count)
                            : null}
                        </span>
                      </Col>
                      <Col xs={6}>
                        <span className="d-block fs-5">
                          <span className="fw-bold">Discount :</span>{" "}
                          {getDiscount(step?.discount)}%
                        </span>
                      </Col>
                      <Col xs={6}>
                        <span className="d-block fs-5">
                          <span className="fw-bold">Quantity :</span>{" "}
                          {step.count}
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
                          <span className="fw-bold">Product Font :</span>{" "}
                          {step.productFont}
                        </span>
                      </Col>
                      {step.orderColor && (
                        <Col xs={12} className="py-3">
                          <span className="fs-5 align-items-center">
                            <span className="fw-bold d-block">
                              Primary Color:{" "}
                            </span>
                            <div className="">
                              {step.orderColor.split(",").map((orderClr, i) => (
                                <div
                                  className="d-flex align-items-center w-100 fs-6"
                                  key={i}
                                >
                                  <span className="fw-bold">
                                    {
                                      colors.filter(
                                        (item) =>
                                          orderClr === item.name ||
                                          orderClr === item.hex
                                      )[0]?.name
                                    }
                                  </span>{" "}
                                  (
                                  {
                                    colors.filter(
                                      (item) =>
                                        orderClr === item.name ||
                                        orderClr === item.hex
                                    )[0]?.hex
                                  }
                                  )
                                  <div
                                    className={styles.color}
                                    style={{
                                      background: `${
                                        colors.filter(
                                          (item) =>
                                            orderClr === item.name ||
                                            orderClr === item.hex
                                        )[0]?.hex
                                      }`,
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </span>
                        </Col>
                      )}
                      {step.color2 && (
                        <Col xs={12} className="py-3">
                          <span className="fs-5 align-items-center">
                            <span className="fw-bold d-block">
                              Secondary Color:{" "}
                            </span>
                            <div className="">
                              {step.color2.split(",").map((orderClr, i) => (
                                <div
                                  className="d-flex align-items-center w-100 fs-6"
                                  key={i}
                                >
                                  <span className="fw-bold">
                                    {
                                      colors.filter(
                                        (item) =>
                                          orderClr === item.name ||
                                          orderClr === item.hex
                                      )[0]?.name
                                    }
                                  </span>{" "}
                                  (
                                  {
                                    colors.filter(
                                      (item) =>
                                        orderClr === item.name ||
                                        orderClr === item.hex
                                    )[0]?.hex
                                  }
                                  )
                                  <div
                                    className={styles.color}
                                    style={{
                                      background: `${
                                        colors.filter(
                                          (item) =>
                                            orderClr === item.name ||
                                            orderClr === item.hex
                                        )[0]?.hex
                                      }`,
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </span>
                        </Col>
                      )}

                      <Col xs={12}>
                        <span className="d-block fs-5">
                          <span className="fw-bold">Images :</span>{" "}
                        </span>
                      </Col>

                      {step.frontImages &&
                        step.frontImages.map((img, i) => (
                          <Col xs={6} key={i}>
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
                      {step.backImages && step.backImages.length > 0 ? (
                        <Col xs={12}>
                          <span className="d-block fs-5">
                            <span className="fw-bold">Back Images :</span>{" "}
                          </span>
                        </Col>
                      ) : (
                        <></>
                      )}

                      {step.backImages &&
                        step.backImages.map((img, i) => (
                          <Col xs={6} key={i}>
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
                      {step.font ? (
                        <Col xs={12}>
                          <span className="d-block fs-5 pt-3">
                            <span className="fw-bold">Font Image :</span>{" "}
                          </span>
                        </Col>
                      ) : (
                        <></>
                      )}

                      {step.font ? (
                        <Col xs={12}>
                          <img
                            onClick={() =>
                              saveAs(
                                `${IMAGE_PATH}small/${step.font}`,
                                `${step.name} ${step.font}`
                              )
                            }
                            src={`${IMAGE_PATH}small/${step.font}`}
                            className={`${styles.images} w-100`}
                          />
                        </Col>
                      ) : (
                        <></>
                      )}
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
                              onClick={() =>
                                saveAs(
                                  `${IMAGE_PATH}small/${step.layoutImage}`,
                                  `${step.name} - Layout`
                                )
                              }
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
                                    (item) =>
                                      step.primaryColor === item.name ||
                                      step.primaryColor === item.hex
                                  )[0]?.hex
                                }
                                )
                                <div
                                  className={styles.color}
                                  style={{
                                    background: `${
                                      colors.filter(
                                        (item) =>
                                          step.primaryColor === item.name ||
                                          step.primaryColor === item.hex
                                      )[0]?.hex
                                    }`,
                                  }}
                                ></div>
                              </span>
                            </Col>
                          )}
                          {step.secondaryText && (
                            <Col xs={12}>
                              <span className="d-block fs-5">
                                <span className="fw-bold">
                                  Secondary Text:{" "}
                                </span>
                                {step.secondaryText}
                              </span>
                            </Col>
                          )}
                          {step.secondaryColor && (
                            <Col xs={12}>
                              <span className="d-flex align-items-center fs-5">
                                <span className="fw-bold">
                                  Secondary Color:{" "}
                                </span>
                                {step.secondaryColor} (
                                {
                                  colors.filter(
                                    (item) =>
                                      step.secondaryColor === item.name ||
                                      step.secondaryColor === item.hex
                                  )[0]?.hex
                                }
                                )
                                <div
                                  className={styles.color}
                                  style={{
                                    background: `${
                                      colors.filter(
                                        (item) =>
                                          step.secondaryColor === item.name ||
                                          step.secondaryColor === item.hex
                                      )[0]?.hex
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
            </>
          ) : null}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedCollectionIndex: state.project.selected_collection,
  role: state.auth.user.userType,
  auth: state.auth.isAuthenticated,
  loading: state.project.loading,
});

export default connect(mapStateToProps, {
  getStepDetails,
  approveStep,
  rejectOrder,
})(StepDetails);
