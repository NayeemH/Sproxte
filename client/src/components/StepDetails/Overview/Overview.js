import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  approveStep,
  editReview,
  postReview,
} from "../../../actions/Project.action";
import { IMAGE_PATH } from "../../../constants/URL";
import { FaTimes } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import styles from "./Overview.module.scss";
import {
  deleteComment,
  toogleEditModalVisibility,
} from "../../../actions/Step.action";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import Moment from "react-moment";

const Overview = ({
  collection,
  selectedStep,
  selectedProject,
  approveStep,
  final,
  isModalOpen,
  feedbackActive,
  setFeedbackActive,
  showForm,
  setShowForm,
  points,
  setPoints,
  postReview,
  role,
  deleteComment,
  toogleEditModalVisibility,
  feedback,
  editReview,
  hoverFB,
  setHoverFB,
  currentIndex,
  lookAt,
  removeHotSpot,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [editMsg, setEditMsg] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [submitModal, setsubmitModal] = useState(false);

  const currentStepHandeler = () => {
    let current = 0;

    let tempProduct = selectedProject.productList.filter(
      (p) => p.steps.filter((s) => s._id === selectedStep._id).length > 0
    )[0];

    tempProduct.steps.map((item, i) => {
      if (item.finalImage !== null) {
        if (current <= i) {
          current = i + 1;
        }
      }
      return null;
    });
    let finalIndex = 0;
    tempProduct.steps.map((item, i) => {
      if (item._id === selectedStep._id) {
        finalIndex = i;
      }
      return null;
    });

    return current === finalIndex;
  };

  const handleClick = () => {
    navigate(`/project/${selectedProject._id}/step/${selectedStep._id}/upload`);
  };

  const handleClickFeedback = () => {
    setFeedbackActive(true);
  };

  const formSubmitHandeler = async (e) => {
    setMessageLoading(true);
    e.preventDefault();
    //console.log("X = ", points.x, "Y = ", points.y, "id", points.stepId);
    let check = await postReview(points, message, selectedStep._id);
    if (check === true) {
      cancelHandeler();
    }
    setsubmitModal(false);
    setMessageLoading(false);
  };

  const modalHandeler = (e) => {
    e.preventDefault();
    setsubmitModal(true);
  };

  const cancelHandelerModal = () => {
    setsubmitModal(false);
    cancelHandeler();
  };

  const cancelHandeler = () => {
    setMessage("");
    setPoints(null);
    setShowForm(false);
    setFeedbackActive(false);
  };

  const editSubmitHandeler = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    let check = await editReview(editMsg, feedback._id, selectedStep._id);
    if (check === true) {
      toogleEditModalVisibility({});
      setEditLoading(false);
    } else {
      setEditLoading(false);
    }
  };

  const deleteFeedbackHandeler = async (id) => {
    deleteComment(collection._id, id);
    if (collection.imageType && collection.imageType === "3d") {
      removeHotSpot(id, "firstScene");
    }
  };

  return (
    <Col md={3} className={styles.wrapper}>
      <Modal
        backdrop="static"
        show={submitModal}
        size=""
        onHide={() => setsubmitModal(false)}
        centered
        style={{ zIndex: "9999" }}
      >
        <Modal.Body className="bg_dark_bg text-light">
          <h4>Send Feedback</h4>
          <div className="pt-3">
            {feedback && (
              <form onSubmit={(e) => formSubmitHandeler(e)}>
                <span className={styles.submit_feedback_modal_text}>
                  You hereby let us know that your organization has finished
                  collecting feedback on this visual, and that our team can get
                  to work processing the feedback for a new version. We strive
                  to achieve a good result in as few steps as possible end
                  result. So check everything carefully.
                </span>
                <div className="d-flex justify-content-end align-items-center pt-4">
                  <Button
                    type="reset"
                    variant="outline-light"
                    onClick={() => cancelHandelerModal()}
                    className={`${styles.cancel_btn} w-100 ms-3`}
                  >
                    <span style={{ marginRight: 5 }}>
                      <FaTimes />{" "}
                    </span>{" "}
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={messageLoading}
                    className={styles.btn}
                  >
                    <span style={{ marginRight: 5 }}>
                      <AiOutlineCheck />{" "}
                    </span>
                    {messageLoading ? "Sending..." : "Send"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        backdrop="static"
        show={isModalOpen}
        onHide={() => toogleEditModalVisibility({})}
        centered
        style={{ zIndex: "9999" }}
      >
        <Modal.Body className="bg_dark_bg bordered text-light">
          <h4>Edit Feedback</h4>
          <div className="pt-3">
            {feedback && (
              <form onSubmit={(e) => editSubmitHandeler(e)}>
                <input
                  type="text"
                  value={editMsg === "" ? feedback.message : editMsg}
                  onChange={(e) => setEditMsg(e.target.value)}
                  className="form-control"
                />
                <div className="d-flex justify-content-around align-items-center pt-4">
                  <Button
                    type="submit"
                    disabled={editLoading}
                    className={styles.btn}
                  >
                    {editLoading ? "Loading..." : "Save"}
                  </Button>
                  <Button
                    type="reset"
                    onClick={() => toogleEditModalVisibility({})}
                    className={styles.btn_feedback}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {(role === "admin" || role === "manager" || role === "developer") &&
        selectedStep.finalImage === null && (
          <Button onClick={handleClick} className={styles.btn}>
            Upload Task Image
          </Button>
        )}
      {collection && (
        <>
          <h5>
            {currentIndex + 1}. {collection.title}
          </h5>
          <p className={styles.desc}>{collection.description}</p>
          {final && (
            <>
              {(role === "client" || role === "admin" || role === "manager") &&
                selectedStep.finalImage === null &&
                currentStepHandeler() && (
                  <Button
                    onClick={() =>
                      approveStep(selectedStep._id, selectedStep.projectId)
                    }
                    className={styles.btn}
                  >
                    Agree
                  </Button>
                )}
              {selectedStep.finalImage === null && feedbackActive ? (
                <div className="">
                  <span className="fw-bold d-block">
                    Click on the image to add feedback
                  </span>
                </div>
              ) : (
                selectedStep.finalImage === null && (
                  <Button
                    onClick={() => handleClickFeedback()}
                    className={styles.btn_feedback}
                  >
                    <AiOutlinePlus className=" fs-6" /> New Feedback
                  </Button>
                )
              )}

              {points !== null &&
                collection._id === points.stepId &&
                showForm === true && (
                  <div className={styles.form}>
                    <Form onSubmit={(e) => modalHandeler(e)}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Add your feedback"
                          className={styles.textarea}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="pt-2">
                          <Button
                            type="submit"
                            disabled={messageLoading}
                            variant="outline-light"
                            className={`w-100 mb-2`}
                          >
                            {messageLoading ? "Loading..." : "Submit"}
                          </Button>
                          {!messageLoading && (
                            <Button
                              type="reset"
                              onClick={cancelHandeler}
                              variant="outline-light"
                              className={`w-100 mb-2`}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                )}
            </>
          )}

          {collection.feedbacks.length > 0 && (
            <div className={styles.fb_wrapper}>
              <h5>Feedbacks</h5>
              {collection.feedbacks.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.feedback} ${
                    hoverFB === item._id ? styles.active : ""
                  }`}
                  onMouseEnter={() => setHoverFB(item._id)}
                  onMouseLeave={() => setHoverFB("")}
                  onClick={() =>
                    collection.imageType &&
                    collection.imageType === "3d" &&
                    lookAt(item.points[0], item.points[1])
                  }
                >
                  <div className="w-100">
                    <div
                      className={`d-flex align-items-center ${styles.user_info}`}
                    >
                      <div className={styles.img_wrapper}>
                        <img
                          src={`${IMAGE_PATH}small/${item.userImage}`}
                          alt={`${item.userName}`}
                          className="h-100"
                        />
                      </div>
                      <span className={styles.username}>{item.userName}</span>
                      {/* <span className={styles.userrole}>{item.userRole}</span> */}
                    </div>
                    <hr className="mt-0 mb-2" />
                    <span className={styles.fb_text}>
                      {i + 1}. {item.message}
                    </span>
                    <span className={styles.fb_date}>
                      <Moment format="DD-MM-YYYY hh:mm">
                        {item.updatedAt}
                      </Moment>
                    </span>
                  </div>
                  <div className={styles.actions}>
                    <span
                      className={styles.delete}
                      onClick={() => deleteFeedbackHandeler(item._id)}
                    >
                      <FaTimes />
                    </span>
                    <span
                      className={styles.edit}
                      onClick={() => toogleEditModalVisibility(item)}
                    >
                      <MdModeEdit />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Col>
  );
};

const mapStateToProps = (state) => ({
  selectedStep: state.project.selected_step,
  selectedProject: state.project.selected_project,
  currentIndex: state.project.selected_collection,
  role: state.dashboard.role,
  isModalOpen: state.project.feedback_modal,
  feedback: state.project.selected_feedback,
});

export default connect(mapStateToProps, {
  approveStep,
  postReview,
  deleteComment,
  toogleEditModalVisibility,
  editReview,
})(Overview);
