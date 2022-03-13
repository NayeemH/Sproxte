import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { setPaymentToken } from "../../actions/Payment.acton";
import { BASE_URL } from "../../constants/URL";
import axios from "axios";

const Payment = ({ id, token, setPaymentToken }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
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
          console.log(":::::::::::::::::::::::::::::::");
          console.log(resKey.data.paymentKey);
          console.log(":::::::::::::::::::::::::::::::");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchToken();
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <Container className="py-4">
        <h2>Checkout</h2>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.payment.id,
  key: state.payment.key,
  token: state.payment.token,
});

export default connect(mapStateToProps, { setPaymentToken })(Payment);
