import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getBgList, uploadBg } from "../../actions/Bg.action";
import { BASE_URL } from "../../constants/URL";
import styles from "./BgList.module.scss";

const BgList = ({ uploadBg, getBgList, bgList }) => {
  const ref = useRef();
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBgList();
  }, []);

  const submitHandeler = async () => {
    setLoading(true);
    let check = await uploadBg(files);
    if (check) {
      setLoading(false);
      setFiles(null);
    } else {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (!e.target.files[i].type.includes("image")) {
          toast.error("Only images are allowed");
          setFiles(null);
          return;
        }
        if (e.target.files[i].size > 2000000) {
          toast.error("Image size must be less than 2MB");
          setFiles(null);
          return;
        }
      }
      setFiles(e.target.files);
    } else {
      setFiles(null);
    }
  };

  const upList = (files) => {
    const list = [];
    for (let i = 0; i < files.length; i++) {
      list.push(
        <Col md={3} className="p-3">
          <img className="w-100" src={URL.createObjectURL(files[i])} alt="" />
        </Col>
      );
    }

    return list;
  };
  return (
    <div className="text-primary">
      {files === null ? (
        <Button className="btn_primary" onClick={() => ref.current.click()}>
          Upload Images
        </Button>
      ) : (
        <Button className="btn_primary" onClick={() => setFiles(null)}>
          Cancel Selected Files
        </Button>
      )}
      <Row>{files !== null ? upList(files) : <></>}</Row>
      <input
        type="file"
        onChange={handleChange}
        ref={ref}
        multiple
        className="d-none"
      />

      {files !== null ? (
        <div className="text-center">
          <Button
            className="btn_primary"
            disabled={loading}
            onClick={() => submitHandeler()}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      ) : (
        <></>
      )}

      <h2 className="text-center text-dark">Current Images</h2>

      {bgList === null ? (
        <div
          className="d-flex justify-content-center align-items-center crd"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      ) : (
        <Row>
          {bgList.data.images.map((bg, i) => (
            <Col md={3} className="p-3" key={i}>
              <img
                className="w-100"
                src={`${BASE_URL}/image/small/${bg}`}
                alt=""
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bgList: state.landing.bgList,
});

export default connect(mapStateToProps, { uploadBg, getBgList })(BgList);
