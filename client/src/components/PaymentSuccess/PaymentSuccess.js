import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCardChecklist, BsCreditCard2Back, BsGlobe } from "react-icons/bs";
import { MdDateRange, MdOutlineSource } from "react-icons/md";
import styles from "./PaymentSuccess.module.scss";

const PaymentSuccess = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button className="btn_primary" onClick={() => setShow(true)}>
        Show Modal
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        className={` shadow`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="gradient_title">Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body className="crd border-none">
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <MdDateRange />
              </span>
              <span className="d-block fw-bold ms-1">Date</span>
            </div>
            <span className="d-block">8 April 2022</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <BsCardChecklist />
              </span>
              <span className="d-block fw-bold ms-1">Status</span>
            </div>
            <span className="d-block">Paid</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <BsCreditCard2Back />
              </span>
              <span className="d-block fw-bold ms-1">Source</span>
            </div>
            <span className="d-block">Card</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <BsGlobe />
              </span>
              <span className="d-block fw-bold ms-1">Country</span>
            </div>
            <span className="d-block">USA</span>
          </div>
          <div className="d-flex justify-content-between align-items-center pb-2 pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <AiOutlineDollarCircle />
              </span>
              <span className="d-block fw-bold fs-5 ms-1">Total</span>
            </div>
            <span className="d-block fw-bold fs-5">$2.50</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn_primary"
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentSuccess;
