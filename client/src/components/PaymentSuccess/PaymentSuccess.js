import React from "react";
import { Card, Button } from "react-bootstrap";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCardChecklist, BsCreditCard2Back, BsGlobe } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { MdDateRange, MdOutlineLocalPostOffice } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GiModernCity } from "react-icons/gi";
import Moment from "react-moment";
import styles from "./PaymentSuccess.module.scss";
import { BiCurrentLocation } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";

const PaymentSuccess = ({ data, country, isAuthenticated }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {data && data.paymentStatus === "paid" ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span className="d-block fs-1 text-success">
            <BsCheckCircle />
          </span>
          <h1 className="pb-4">Payment Successful</h1>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span className="d-block fs-1 text-danger">
            <AiOutlineCloseCircle />
          </span>
          <h1 className="pb-4">Payment Failed</h1>
        </div>
      )}
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
              <span className="d-block fw-bold fs-6 ms-1">Subtotal</span>
            </div>
            <span className="d-block fs-6">${data.price}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center pb-2 pt-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block fw-bold fs-6 ms-1">Shipping Cost</span>
            </div>
            <span className="d-block fs-6">${data.shippingCost}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center pt-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <AiOutlineDollarCircle />
              </span>
              <span className="d-block fw-bold fs-5 ms-1">Total</span>
            </div>
            <span className="d-block fw-bold fs-5">
              ${data.shippingCost + data.price}
            </span>
          </div>
        </Card.Body>
      </Card>

      {isAuthenticated === true ? (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            onClick={() => navigate("/dashboard")}
            className="btn_primary"
          >
            Dashboard
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PaymentSuccess);
