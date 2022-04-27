import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./PaymentAddPlayer.module.scss";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { setPaymentToken } from "../../actions/Payment.acton";
import { BASE_URL } from "../../constants/URL";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentAddPlayer = ({ auth }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();

  const { id, count } = useParams();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resKey = await axios.get(
          `${BASE_URL}/api/v1/payment/publishableKey`
        );
        const res = await axios.post(
          `${BASE_URL}/api/v1/payment/addPlayerPaymentToken/${id}`,
          JSON.stringify({ count }),
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (resKey.data.paymentKey) {
          setStripePromise(loadStripe(resKey.data.paymentKey));
        }
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    if (!auth) {
      navigate("/login");
      return;
    }
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
                <CheckoutForm id={id} />
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

export default connect(mapStateToProps, { setPaymentToken })(PaymentAddPlayer);
