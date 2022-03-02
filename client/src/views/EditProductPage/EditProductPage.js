import React, { useEffect } from "react";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";
import { getProductDetails } from "../../actions/Project.action";
import EditProductForm from "../../components/EditProductForm/EditProductForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./EditProductPage.module.css";

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
    <div className={`bg_dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <FilterDashboard />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Dashboard
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          Edit Type
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {data && data.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      {data !== {} && types.length === 0 ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <EditProductForm data={data} />
      )}
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
