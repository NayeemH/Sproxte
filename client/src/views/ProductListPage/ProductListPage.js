import React, { useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjectsList } from "../../actions/Project.action";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import ProductList from "../../components/ProductList/ProductList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ProductListPage.module.css";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjectsList());
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
          Product List
        </Breadcrumb.Item>
        <Button
          className="ms-auto"
          onClick={() => navigate("/add-product")}
          className={styles.btn}
        >
          Add Product
        </Button>
      </Breadcrumb>
      <ProductList />
    </div>
  );
};

export default ProductListPage;
