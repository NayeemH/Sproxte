import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getClientList } from "../../actions/Dashboard.action";
import ClientList from "../../components/ClientList/ClientList";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ClientListPage.module.css";

const ClientListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientList());
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
          Client List
        </Breadcrumb.Item>
      </Breadcrumb>
      <ClientList />
    </div>
  );
};

export default ClientListPage;
