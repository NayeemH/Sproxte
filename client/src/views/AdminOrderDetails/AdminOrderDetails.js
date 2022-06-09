import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryList, getPaymentDetails } from "../../actions/Order.action";
import { Spinner } from "react-bootstrap";
import AdminInvoice from "../../components/AdminInvoice/AdminInvoice";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";

const AdminOrderDetails = ({
  payment,
  getPaymentDetails,
  country,
  getCountryList,
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
  }, [id, payment]);
  return (
    <div>
      <NewLayout>
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
      </NewLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.order.selected_order,
  country: state.order.country,
});

export default connect(mapStateToProps, { getPaymentDetails, getCountryList })(
  AdminOrderDetails
);
