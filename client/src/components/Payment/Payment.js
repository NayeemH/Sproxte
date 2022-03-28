import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { setPaymentToken } from "../../actions/Payment.acton";
import { BASE_URL } from "../../constants/URL";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const queryString = require("query-string");

const Payment = ({ auth }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resKey = await axios.get(
          `${BASE_URL}/api/v1/payment/publishableKey`
        );
        const res = await axios.post(
          `${BASE_URL}/api/v1/payment/paymentToken/${id}`,
          {},
          { withCredentials: true }
        );
        setClientSecret(res.data.clientSecret);
        if (resKey.data.paymentKey) {
          setStripePromise(loadStripe(resKey.data.paymentKey));
        }
        if (!auth) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        if (!auth) {
          navigate("/login");
        }
      }
    };
    if (id) {
      fetchToken();
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className="py-4 d-flex justify-content-center align-items-center">
        <Card className={`${styles.crd} shadow w-100`}>
          <Card.Body>
            <h2 className="text-center pb-3">Checkout</h2>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.payment.id,
  key: state.payment.key,
  token: state.payment.token,
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setPaymentToken })(Payment);
