import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryList, getPaymentDetails } from "../../actions/Order.action";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import { Spinner } from "react-bootstrap";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";
import { clearCart } from "../../actions/Cart.action";

const DiscoverPage = ({
  payment,
  getPaymentDetails,
  auth,
  country,
  getCountryList,
  clearCart,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!payment && id) {
      getPaymentDetails(id);
    }

    if (!country) {
      getCountryList();
    }

    if (!id) {
      navigate("/");
    }

    if (payment && payment.paymentStatus === "paid") {
      clearCart();
    }
  }, [id, auth, country, payment]);
  return (
    <div>
      <NewLayout>
        {payment && country ? (
          <PaymentSuccess data={payment} country={country} />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Spinner variant="dark" animation="grow" />
          </div>
        )}
      </NewLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.order.selected_order,
  auth: state.auth.isAuthenticated,
  country: state.order.country,
});

export default connect(mapStateToProps, {
  getPaymentDetails,
  getCountryList,
  clearCart,
})(DiscoverPage);
