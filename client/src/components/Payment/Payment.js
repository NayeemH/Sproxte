import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { setPaymentToken } from "../../actions/Payment.acton";

const Payment = ({ id, key, token, setPaymentToken }) => {
  useEffect(() => {
    if (id) {
      setPaymentToken(id);
    }
  }, [id]);
  const stripePromise = loadStripe(key);
  return (
    <div className={styles.wrapper}>
      <Container className="py-4">
        <h2>Checkout</h2>
        {key && token && (
          <Elements stripe={stripePromise} options={{ clientSecret: token }}>
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
