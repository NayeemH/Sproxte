import React, { useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./CategoryListPage.module.css";
import { getCategoryList } from "../../actions/Category.action";
import CategoryList from "../../components/CategoryList/CategoryList";

const CategoryListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategoryList());
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
          Category
        </Breadcrumb.Item>
        <Button
          className="ms-auto"
          onClick={() => navigate("/add-category")}
          className={styles.btn}
        >
          Add Category
        </Button>
      </Breadcrumb>
      <CategoryList />
    </div>
  );
};

export default CategoryListPage;
