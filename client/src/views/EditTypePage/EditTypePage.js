import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";
import EditTypeForm from "../../components/EditTypeForm/EditTypeForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
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
          {type && type.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      {type && <EditTypeForm data={type} />}
    </div>
  );
};

export default connect(null, { getTypeList })(EditTypePage);
