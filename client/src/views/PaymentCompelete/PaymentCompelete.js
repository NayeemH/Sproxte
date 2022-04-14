import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { getPaymentDetails } from "../../actions/order.action";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import { Spinner } from "react-bootstrap";

const DiscoverPage = ({ payment, getPaymentDetails }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!payment && id) {
      getPaymentDetails(id);
    }

    if (!id) {
      navigate("/");
    }
  }, [id]);
  return (
    <div>
      <Nav />
      {payment ? (
        <PaymentSuccess data={payment} />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner variant="grow" color="dark" />
        </div>
      )}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.order.selected_order,
});

export default connect(mapStateToProps, { getPaymentDetails })(DiscoverPage);
