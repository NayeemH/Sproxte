import React from "react";
import { Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import logo from "../../assets/logoSq.png";
import { hexToBase64 } from "../../utils/hexToBase";
import styles from "./AdminInvoice.module.scss";

const AdminInvoice = ({ data, country }) => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Invoice</h2>
        <img src={logo} className={styles.img} alt="" />
      </div>
      <Row className="">
        <Col md={2}>Order No:</Col>
        <Col md={6} className="fw-bold">
          #{hexToBase64(data._id.slice(0, 8)).slice(0, 6)}
        </Col>
      </Row>
      <Row className="">
        <Col md={2}>Order Date:</Col>
        <Col md={6}>
          <Moment format="DD-MMMM-YYYY">{data.createdAt}</Moment>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col md={6}>
          <span className="d-block fs-5 fw-bold">Sportsveins</span>
          <span className="d-block">424 Sapphire Band</span>
          <span className="d-block">Riverdale, Georgia 30296</span>
          <span className="d-block">United States</span>
          <span className="d-block">+1 404-585-1512</span>
          <span className="d-block">orders@sproxte.com</span>
        </Col>
        <Col md={6}>
          <span className="d-block fs-5 fw-bold">Bill to</span>
          <span className="d-block">
            {data.firstName} {data.lastName}
          </span>
          <span className="d-block">{data.address}</span>
          <span className="d-block">
            {data.city}, {data.state} {data.zip}
          </span>
          <span className="d-block">
            {country.filter((item) => item.value === data.country)[0].label}
          </span>
          <span className="d-block">{data.email}</span>
          <span className="d-block">{data.phone}</span>
        </Col>
      </Row>
      <div className="py-4 d-flex justify-content-between align-items-center">
        <h2>
          ${data.price + data.shippingCost}{" "}
          {data.paymentStatus === "due" ? "due" : "paid"}
        </h2>
        {data.isShippingLabel === true ? (
          <h2>Tracking: {data.masterTrackingNumber}</h2>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminInvoice;
