import React, { useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TypeList from "../../components/TypeList/TypeList";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./TypeListPage.module.css";
import { getTypeList } from "../../actions/Landing.action";

const TypeListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTypeList());
  }, []);
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
          Templates
        </Breadcrumb.Item>
        <Button
          className="ms-auto"
          onClick={() => navigate("/add-template")}
          className={styles.btn}
        >
          Add Template
        </Button>
      </Breadcrumb>
      <TypeList />
    </div>
  );
};

export default TypeListPage;
