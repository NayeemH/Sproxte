import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getIEPData } from "../../actions/Profile.action";
import InvoiceReport from "../../components/InvoiceReport/InvoiceReport";

const InvoicePage = ({ getIEPData, data }) => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getIEPData(id);
  }, [id]);
  return (
    <div>
      {data ? (
        <InvoiceReport data={data} />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 700 }}
        >
          <Spinner variant="dark" animation="grow" />{" "}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.dashboard.iep_invoice,
});

export default connect(mapStateToProps, { getIEPData })(InvoicePage);
