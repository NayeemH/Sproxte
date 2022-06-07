import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { getCountryList, getPaymentDetails } from "../../actions/Order.action";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import { Spinner } from "react-bootstrap";
import AdminInvoice from "../../components/AdminInvoice/AdminInvoice";

const AdminOrderDetails = ({
  payment,
  getPaymentDetails,
  auth,
  country,
  getCountryList,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!payment && id && auth) {
      getPaymentDetails(id);
    }

    if (!country) {
      getCountryList();
    }

    if (!id) {
      navigate("/");
    }
  }, [id, auth, country, payment]);
  return (
    <div>
      <Nav />
      {payment && country ? (
        <AdminInvoice data={payment} country={country} />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="dark" animation="grow" />
        </div>
      )}
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
  AdminOrderDetails
);
