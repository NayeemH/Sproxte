import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { uploadFile } from "../../actions/Project.action";
import styles from "./FileUp.module.css";

const FileUp = ({ step, project, modals, uploadFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmitHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!selectedFile) {
      toast.error("Please select a file");
      setLoading(false);
      return;
    } else {
      const check = await uploadFile(selectedFile, step, project);
      if (check === true) {
        setLoading(false);
        modals.closeAll();
      } else {
        setLoading(false);
      }
      return;
    }
  };
  return (
    <div>
      <Form onSubmit={onSubmitHandeler}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select Final File</Form.Label>
          <Form.Control type="file" onChange={onChangeHandler} />
        </Form.Group>
        <button type="submit" disabled={loading} className={styles.btn}>
          {loading ? "Loading" : "Upload"}
        </button>
      </Form>
    </div>
  );
};

export default connect(null, { uploadFile })(FileUp);
