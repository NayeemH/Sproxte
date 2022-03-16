import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";
import { getProductDetails } from "../../actions/Project.action";
import EditProductFinal from "../../components/EditProductFinal/EditProductFinal";
import Layout from "../../components/Shared/Layout/Layout";

const EditProductPage = ({ getProductDetails, data, types, getTypeList }) => {
  const { id } = useParams();

  useEffect(() => {
    if (types.length === 0) {
      getTypeList();
    }
    if (id) {
      getProductDetails(id);
    }
  }, [id]);
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout>
        {/* <h4 className="px-5">{data && data.name}</h4> */}
        {data !== {} && types && types.length === 0 ? (
          <div
            className=" d-flex justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
          >
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <EditProductFinal data={data} />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.landing.selected_product,
  types: state.landing.types,
});

export default connect(mapStateToProps, { getProductDetails, getTypeList })(
  EditProductPage
);
