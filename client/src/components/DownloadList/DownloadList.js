import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL, IMAGE_PATH } from "../../constants/URL";
import styles from "./DownloadList.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Moment from "react-moment";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
const FileDownload = require("js-file-download");

const DownloadList = ({ project }) => {
  const [size, setSize] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        let res = await axios.get(
          `${BASE_URL}/api/project/download/${project._id}`
        );
        setSize(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [all1, setAll1] = useState(false);
  const [all2, setAll2] = useState(false);
  const [download, setDownload] = useState("");
  const checkValidity = (task) => {
    if (task.steps.filter((step) => step.finalImage === null).length > 0) {
      return false;
    }
    return true;
  };

  const onSelectCheck1 = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      if (all1) {
        setAll1(false);
      }
    } else {
      setSelected([...selected, id]);
    }
  };
  const onSelectCheck2 = (id) => {
    if (selected2.includes(id)) {
      setSelected2(selected2.filter((item) => item !== id));
      if (all2) {
        setAll2(false);
      }
    } else {
      setSelected2([...selected2, id]);
    }
  };

  const onSelectAll1 = () => {
    if (all1 === false) {
      setSelected([
        ...project.productList
          .filter((product) => checkValidity(product))
          .map((item) => item._id),
      ]);
    } else {
      setSelected([]);
    }
    setAll1(!all1);
  };
  const onSelectAll2 = () => {
    if (all2 === false) {
      setSelected2([
        ...project.productList
          .filter((product) => checkValidity(product))
          .map((item) => item._id),
      ]);
    } else {
      setSelected2([]);
    }
    setAll2(!all2);
  };

  const downloadHandeler1 = async () => {
    if (all1 === true) {
      try {
        let res = await axios.get(
          `${BASE_URL}/api/download/project/${project._id}`,
          { responseType: "blob" }
        );
        if (res.data) {
          FileDownload(res.data, `${project.name}.zip`);
          toast.success("Downloading...");
        }
      } catch (err) {
        err.response.data.msg.map((msg) => toast.error(msg));
      }
    } else {
      try {
        const formData = {
          productList: selected,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          responseType: "blob",
        };
        let res = await axios.post(
          `${BASE_URL}/api/download/select/${project._id}`,
          JSON.stringify(formData),
          config
        );
        if (res.data) {
          FileDownload(res.data, `${project.name}.zip`);
        }
      } catch (err) {
        err.response.data.msg.map((msg) => toast.error(msg));
      }
    }
  };
  const downloadHandeler2 = async () => {
    try {
      const formData = {
        productList: selected2,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      let res = await axios.post(
        `${BASE_URL}/api/download/link/${project._id}`,
        JSON.stringify(formData),
        config
      );
      if (res.data) {
        setDownload(res.data.downloadLink);
        toast.success("Link Generated Successfully");
      }
    } catch (err) {
      err.response.data.msg.map((msg) => toast.error(msg));
    }
  };
  return (
    <Form>
      <div className={styles.wrapper}>
        <Modal
          backdrop="static"
          show={download !== ""}
          onHide={() => setDownload("")}
          size="lg"
          centered
        >
          <Modal.Body>
            <span className="fs-4">Your downloads are ready</span>
            <span className="d-block pt-2">
              Copy the link to share your downloads.
            </span>

            <span className="d-block pt-3 pb-3">
              {download}{" "}
              <CopyToClipboard
                text={download}
                onCopy={() => toast.success("Link saved to clipboard")}
              >
                <span className={styles.down}>
                  <MdContentCopy />
                </span>
              </CopyToClipboard>
            </span>

            <div className="d-flex justify-content-end align-items-center">
              <Button
                className={styles.down_btn}
                onClick={() => setDownload("")}
              >
                <AiOutlineCheck /> Finish
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <div className="d-flex justify-content-center align-items-center"></div>
        <Row>
          <Col
            xs={12}
            md={8}
            className="d-flex flex-md-row flex-column align-items-center pb-3 px-5"
          ></Col>

          <Col
            md={2}
            className="d-flex align-items-center flex-column justify-content-center p-3 text-center"
          >
            <Button
              variant="primary"
              disabled={selected.length <= 0}
              className={`${styles.btn}  mb-3`}
              onClick={() => downloadHandeler1()}
            >
              Download All
            </Button>
            {/* <span className="d-block">Select all for downloaing now</span> */}
            <Form.Check
              checked={all1}
              onChange={() => onSelectAll1()}
              type="checkbox"
              id={`default-checkbox`}
            />
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center flex-column justify-content-center p-3 text-center"
          >
            <Button
              variant="primary"
              disabled={selected2.length <= 0}
              className={`${styles.btn} mb-3`}
              onClick={() => downloadHandeler2()}
            >
              Share Link
            </Button>
            {/* <span className="d-block">
              Select all for genarating download link
            </span> */}
            <Form.Check
              checked={all2}
              onChange={() => onSelectAll2()}
              type="checkbox"
              id={`default-checkbox`}
            />
          </Col>
        </Row>
        {/* <div className={styles.hr}></div> */}
        {project.productList
          .filter((product) => checkValidity(product))
          .map((task, index) => (
            <div className={styles.steps_wrapper} key={index}>
              <Row>
                <Col
                  md={4}
                  className="d-flex align-items-center flex-md-row flex-column"
                >
                  <img
                    src={`${IMAGE_PATH}small/${task.image}`}
                    className={styles.img}
                    alt=""
                  />
                  <h4 className={styles.name}>{task.name}</h4>
                </Col>
                <Col
                  md={1}
                  xs={6}
                  className={`${styles.border_left} d-flex align-items-start flex-column justify-content-center p-md-0 p-3 ps-md-2`}
                >
                  <span className="d-block pt-2">Dimension</span>
                  <span className="d-block">Size</span>
                  <span className="d-block pb-2">Created At</span>
                </Col>
                <Col
                  md={3}
                  xs={6}
                  className="d-flex align-items-start flex-column justify-content-center p-md-0 p-3"
                >
                  {size.map((item, index) =>
                    item._id === task._id ? (
                      <div key={index}>
                        <span className="d-block">
                          {item.width} x {item.height}
                        </span>
                        <span className="d-block">
                          {parseInt(item.size) > 1024
                            ? `${parseInt(item.size) / 1024} MB`
                            : `${parseInt(item.size)} KB`}
                        </span>
                        <span className="d-block">
                          <Moment
                            format="DD-MM-YYYY"
                            date={project.updatedAt}
                          ></Moment>
                        </span>
                      </div>
                    ) : (
                      <></>
                    )
                  )}
                </Col>
                <Col
                  md={2}
                  xs={6}
                  className="d-flex align-items-center justify-content-center p-md-0 p-3"
                >
                  <Form.Check
                    checked={selected.includes(task._id)}
                    onChange={() => onSelectCheck1(task._id)}
                    type="checkbox"
                    id={`default-checkbox`}
                  />
                </Col>
                <Col
                  md={2}
                  xs={6}
                  className="d-flex align-items-center justify-content-center p-md-0 p-3"
                >
                  <Form.Check
                    type="checkbox"
                    id={`default-checkbox`}
                    checked={selected2.includes(task._id)}
                    onChange={() => onSelectCheck2(task._id)}
                  />
                </Col>
              </Row>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default DownloadList;
