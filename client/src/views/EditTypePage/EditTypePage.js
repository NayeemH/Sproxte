import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";
import EditTypeForm from "../../components/EditTypeForm/EditTypeForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Layout from "../../components/Shared/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./EditTypePage.module.css";

const EditTypePage = ({ getTypeList }) => {
  const { id } = useParams();
  const type = useSelector(
    (state) => state.landing.types.filter((type) => type._id === id)[0]
  );
  useEffect(() => {
    if (!type) {
      getTypeList();
    }
  }, [id, type]);
  return (
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <h4 className="px-5">{type && type.name}</h4>
        {type && <EditTypeForm data={type} />}
      </Layout>
    </div>
  );
};

export default connect(null, { getTypeList })(EditTypePage);
