import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { getCountryList, getPaymentDetails } from "../../actions/Order.action";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import { Spinner } from "react-bootstrap";

const PaymentCompeleteAddPlayer = ({ auth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      setTimeout(() => {
        if (!auth) {
          navigate("/");
        }
      }, 2000);
    };

    checkAuth();
  }, []);
  return (
    <div>
      <Nav />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <span className="h3">Payment Compeleted</span>
      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.order.selected_order,
  auth: state.auth.isAuthenticated,
  country: state.order.country,
});

export default connect(mapStateToProps, { getPaymentDetails, getCountryList })(
  PaymentCompeleteAddPlayer
);
