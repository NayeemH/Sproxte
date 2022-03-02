import React from "react";
import Steps, { Step } from "rc-steps";
import { Button } from "react-bootstrap";
import styles from "./ProjectDetails.module.css";
import "rc-steps/assets/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, IMAGE_PATH } from "../../constants/URL";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BsExclamationLg } from "react-icons/bs";
const FileDownload = require("js-file-download");

const ProjectDetails = ({ project }) => {
  const role = useSelector((state) => state.dashboard.role);
  const { id } = useParams();
  const navigate = useNavigate();
  let width = window.innerWidth;
  const currentStepHandeler = (product) => {
    let current = 0;
    product.steps.map((item, i) => {
      if (item.finalImage !== null) {
        if (current <= i) {
          current = i + 1;
        }
      }
      return null;
    });

    return current;
  };

  const downloadButtonHandeler = (task) => {
    if (task.steps.filter((step) => step.finalImage === null).length > 0) {
      return false;
    }
    return true;
  };

  const downloadProduct = async (task) => {
    try {
      let res = await axios.get(
        `${BASE_URL}/api/download/product/${task._id}`,
        { responseType: "blob" }
      );
      if (res.data) {
        FileDownload(res.data, `${task.name}.zip`);
      }
    } catch (err) {
      err.response.data.msg.map((msg) => toast.error(msg));
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className="d-flex flex-md-row flex-column align-items-center">
        {(role === "admin" || role === "manager") && (
          <Button
            variant="primary"
            as={Link}
            to={`/project/add-task/${id}`}
            className={styles.button}
          >
            Add New Task
          </Button>
        )}
        <Button
          variant="primary"
          as={Link}
          to={`/project/${id}/download`}
          className={`${styles.button} mt-md-0 `}
        >
          Finished Products
        </Button>
      </div>
      <div className={styles.steps_wrapper}>
        {project.productList &&
          project.productList.map((task, index) => (
            <div className={styles.task} key={index}>
              <div className={styles.img_task}>
                {task.image && (
                  <img
                    src={`${IMAGE_PATH}small/${task.image}`}
                    className="img-fluid"
                    alt=""
                  />
                )}
              </div>
              <div className="d-flex flex-column  justify-content-center py-3">
                <h4 className={styles.name}>{task.name}</h4>
                <Steps
                  labelPlacement="vertical"
                  current={currentStepHandeler(task)}
                  icons={{
                    finish: <AiOutlineCheck color="#fff" />,
                    process: <BsExclamationLg color="#fff" />,
                  }}
                  direction={width > 768 ? "horizontal" : "vertical"}
                >
                  {task.steps &&
                    task.steps.map((step, i) => (
                      <Step
                        {...(step.viewed === false && { status: "error" })}
                        title={step.name}
                        key={i}
                        className={styles.stp}
                        onClick={() =>
                          navigate(`/project/${project._id}/step/${step._id}`)
                        }
                      />
                    ))}
                </Steps>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="outline-primary"
                  disabled={!downloadButtonHandeler(task)}
                  onClick={() => downloadProduct(task)}
                  className={styles.btn__dwn}
                >
                  Go to Downloads
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
