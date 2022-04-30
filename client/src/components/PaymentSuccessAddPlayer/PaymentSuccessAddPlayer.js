import React from "react";
import { Card, Button } from "react-bootstrap";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PaymentSuccessAddPlayer.module.scss";
import { BsCheckCircle } from "react-icons/bs";
import { connect } from "react-redux";

const PaymentSuccessAddPlayer = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id, count, addition, price } = useParams();
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <span className="d-block fs-1 text-success">
          <BsCheckCircle />
        </span>
        <h1 className="pb-4">Payment Successful</h1>
      </div>

      <Card className={`crd shadow`} style={{ maxWidth: "30rem" }}>
        <Card.Header>
          <Card.Title className="text-dark fw-bold">Order Summary</Card.Title>
        </Card.Header>
        <Card.Body className="crd border-none">
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block fw-bold ms-1">Product Price</span>
            </div>
            <span className="d-block">${price}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block fw-bold ms-1">Additinal Price</span>
            </div>
            <span className="d-block text-capitalize">${addition}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block fw-bold ms-1">Count</span>
            </div>
            <span className="d-block">{count}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center pb-2 pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <span className="d-block pb-1 text_primary">
                <AiOutlineDollarCircle />
              </span>
              <span className="d-block fw-bold fs-5 ms-1">Total</span>
            </div>
            <span className="d-block fw-bold fs-5">
              ${parseInt(count) * (parseInt(price) + parseInt(addition))}
            </span>
          </div>
        </Card.Body>
      </Card>

      <h4 className="pt-3">Go back to dashboard and start adding players.</h4>

      {isAuthenticated === true ? (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            onClick={() => navigate(`/team-dashboard/order/${id}`)}
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

export default connect(mapStateToProps, null)(PaymentSuccessAddPlayer);
