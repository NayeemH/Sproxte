import React from "react";
import { Card } from "react-bootstrap";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCardChecklist, BsCreditCard2Back, BsGlobe } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { MdDateRange, MdOutlineLocalPostOffice } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import Moment from "react-moment";
import styles from "./PaymentSuccess.module.scss";
import { BiCurrentLocation } from "react-icons/bi";

const PaymentSuccess = ({ data, country }) => {
  return (
    <div className={styles.wrapper}>
      <Card className={`crd shadow`} style={{ maxWidth: "30rem" }}>
        <Card.Header>
          <Card.Title className="text-dark fw-bold">Order Summary</Card.Title>
        </Card.Header>
        <Card.Body className="crd border-none">
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <MdDateRange />
              </span>
              <span className="d-block fw-bold ms-1">Date</span>
            </div>
            <span className="d-block">
              <Moment format="DD MMMM YYYY">{data.createdAt}</Moment>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <BsCardChecklist />
              </span>
              <span className="d-block fw-bold ms-1">Status</span>
            </div>
            <span className="d-block text-capitalize">
              {data.paymentStatus}
            </span>
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
            <span className="d-block">
              {country.filter((item) => item.value === data.country)[0].label}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <GiModernCity />
              </span>
              <span className="d-block fw-bold ms-1">City</span>
            </div>
            <span className="d-block">{data.city}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <FaCity />
              </span>
              <span className="d-block fw-bold ms-1">State</span>
            </div>
            <span className="d-block">{data.state}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <MdOutlineLocalPostOffice />
              </span>
              <span className="d-block fw-bold ms-1">Zip</span>
            </div>
            <span className="d-block">{data.zip}</span>
          </div>
          {data.location && (
            <div className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div className="d-flex align-items-center justify-content-center">
                <span className="d-block pb-1 text_primary">
                  <BiCurrentLocation />
                </span>
                <span className="d-block fw-bold ms-1">Location</span>
              </div>
              <span className="d-block">{data.location}</span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center pb-2 pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <AiOutlineDollarCircle />
              </span>
              <span className="d-block fw-bold fs-5 ms-1">Total</span>
            </div>
            <span className="d-block fw-bold fs-5">${data.price}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
