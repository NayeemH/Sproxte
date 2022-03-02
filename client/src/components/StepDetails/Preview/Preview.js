import React, { useEffect, useRef, useState } from "react";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./Preview.module.scss";
import { IMAGE_PATH } from "../../../constants/URL";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedCollectionChange,
  selectIndex,
} from "../../../actions/Project.action";
import { IoMdDownload } from "react-icons/io";
import { saveAs } from "file-saver";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";

const Preview = ({
  data,
  length,
  index,
  collections,
  projectId,
  feedbackActive,
  showForm,
  setShowForm,
  points,
  setPoints,
  hoverFB,
  setHoverFB,
  ReactPannellum,
  addHotSpot,
  lookAt,
  mouseEventToCoords,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const imgRef = useRef(null);
  const project = useSelector((state) => state.project.selected_project);
  const { stepId } = useParams();

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 37) {
        if (index > 0) {
          dispatch(selectIndex(index - 1));
        }
      }
      if (e.keyCode === 39) {
        if (index !== length - 1) {
          dispatch(selectIndex(index + 1));
        }
      }
      if (e.keyCode === 38) {
        let currentProd = undefined;
        let currentStep = undefined;

        project.productList.map((item, i) => {
          item.steps.map((stp, j) => {
            if (stepId === stp._id) {
              currentProd = i;
              currentStep = j;
            }
            return null;
          });
          return null;
        });

        let len = project.productList[currentProd].steps.length;

        //console.log(currentProd, currentStep, len);
        if (
          currentProd !== undefined &&
          currentStep !== undefined &&
          len - 1 > currentStep
        ) {
          navigate(
            `/project/${projectId}/step/${
              project.productList[currentProd].steps[currentStep + 1]._id
            }`
          );
        }
      }
      if (e.keyCode === 40) {
        let currentProd = undefined;
        let currentStep = undefined;

        project.productList.map((item, i) => {
          item.steps.map((stp, j) => {
            if (stepId === stp._id) {
              currentProd = i;
              currentStep = j;
            }
            return null;
          });
          return null;
        });

        // console.log(currentProd, currentStep.len);
        if (
          currentProd !== undefined &&
          currentStep !== undefined &&
          currentStep > 0
        ) {
          navigate(
            `/project/${projectId}/step/${
              project.productList[currentProd].steps[currentStep - 1]._id
            }`
          );
        }
      }
    });
  }, [collections]);

  const mouseClick3D = (e) => {
    if (data.imageType && data.imageType === "3d" && feedbackActive) {
      let coords = mouseEventToCoords(e);
      addHotSpot({
        pitch: coords[0],
        yaw: coords[1],
        type: "info",
        text: "",
      });

      setPoints({ x: coords[0], y: coords[1], stepId: data._id });

      setShowForm(true);
    }
  };

  const downloadImage = () => {
    saveAs(
      `${IMAGE_PATH}original/${data.image}`,
      `${data.title} ${data.image}`
    );
  };

  const historyHandeler = () => {
    setShowHistory(!showHistory);
  };

  const selectFunc = (i) => {
    dispatch(selectIndex(i));
    setShowHistory(false);
  };

  const imgClickHandeler = (e) => {
    if (e.target.id === "img") {
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        imgRef.current.getBoundingClientRect();
      let cursorX = clientX - left;
      let cursorY = clientY - top;

      let x = (cursorX / width) * 100;
      let y = (cursorY / height) * 100;

      setPoints({ x, y, stepId: data._id });

      setShowForm(true);
    }
  };

  return (
    <Col md={9}>
      <div className={`${styles.arrows_section} d-flex align-items-center p-2`}>
        <span className={styles.back_icon}>
          <AiOutlineLeft
            size={20}
            onClick={() => navigate(`/project/${projectId}`)}
          />
        </span>
        <div className="d-flex justify-content-center align-items-center w-100">
          <span className={styles.nav}>
            <AiOutlineLeft
              size={20}
              onClick={() =>
                index > 0 && dispatch(selectedCollectionChange(false))
              }
              style={index === 0 && { color: "#ccc", cursor: "auto" }}
            />
          </span>
          <span>{data.title}</span>
          <span className={styles.nav_right}>
            <AiOutlineRight
              size={20}
              onClick={() =>
                index !== length - 1 && dispatch(selectedCollectionChange(true))
              }
              style={index === length - 1 && { color: "#ccc", cursor: "auto" }}
            />
          </span>
        </div>
      </div>
      <div
        className={styles.img_wrapper}
        ref={imgRef}
        onClick={(e) => mouseClick3D(e)}
      >
        {data.imageType && data.imageType === "3d" ? (
          <ReactPannellum
            id="test"
            sceneId="firstScene"
            imageSource={`${IMAGE_PATH}original/${data.image}`}
            config={{
              autoLoad: true,
              hotSpotDebug: true,
              showZoomCtrl: false,
              showFullscreenCtrl: false,
              hotSpots: [
                ...data.feedbacks.map((item, i) => {
                  return {
                    id: item._id,
                    pitch: item.points[0],
                    yaw: item.points[1],
                    type: "info",
                    content: `${i + 1}`,
                    text: item.message,
                  };
                }),
              ],
            }}
            style={{
              width: "100%",
              height: "90vh",
            }}
          />
        ) : (
          <img
            src={`${IMAGE_PATH}original/${data.image}`}
            alt=""
            id="img"
            onClick={(e) => imgClickHandeler(e)}
            className={styles.img}
          />
        )}

        {data.imageType &&
          data.imageType !== "3d" &&
          points !== null &&
          data._id === points.stepId && (
            <div
              className={styles.point}
              style={{ left: `${points.x - 1}%`, top: `${points.y - 1}%` }}
            >
              <BiHelpCircle />
            </div>
          )}

        {(!data.imageType || data.imageType !== "3d") &&
          data.feedbacks.map((feedback, i) => (
            <div
              className={`${styles.point} 
              }`}
              key={feedback._id}
              onMouseLeave={() => setHoverFB("")}
              onMouseEnter={() => setHoverFB(feedback._id)}
              style={{
                left: `${feedback.points[0] - 1}%`,
                top: `${feedback.points[1] - 1}%`,
              }}
            >
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={feedback._id}>
                    {i + 1}. {feedback.message}
                  </Tooltip>
                }
              >
                <span
                  className={`${styles.point__icon} ${
                    hoverFB === feedback._id ? styles.active : ""
                  }`}
                >
                  {i + 1}
                </span>
              </OverlayTrigger>
            </div>
          ))}

        <div
          className={`d-flex justify-content-between align-items-center pt-2 pb-md-0 pb-3 ${styles.history_wrapper}`}
        >
          {showHistory && (
            <div className={styles.list}>
              {/* <span className={styles.history_heading}>
                Use arrow keys left and right to <br />
                step through history.
              </span> */}
              {collections.map((item, i) => (
                <div
                  key={item._id}
                  className={`py-1 ${styles.item} ${
                    i === index && styles.active
                  }`}
                  onClick={() => selectFunc(i)}
                >
                  <span className="d-block">
                    {i + 1}. {item.title}
                  </span>
                  <span className={styles.date}>
                    <Moment format="DD-MM-YYYY">{item.createAt}</Moment>
                    <span className="mb-1 ">
                      <GoPrimitiveDot size={12} />
                    </span>
                    <Moment format="hh:mm">{item.createAt}</Moment>
                  </span>
                </div>
              ))}
            </div>
          )}
          <span className={styles.icon}>
            <MdHistory onClick={historyHandeler} size={20} />
          </span>
          <span className={styles.date}>
            <Moment format="DD-MM-YYYY">{data.createAt}</Moment>
          </span>
          <span className={styles.icon}>
            <IoMdDownload onClick={downloadImage} size={20} />
          </span>
        </div>
      </div>
    </Col>
  );
};

export default Preview;
