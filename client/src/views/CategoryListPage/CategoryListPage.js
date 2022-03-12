import React, { useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./CategoryListPage.module.css";
import { getCategoryList } from "../../actions/Category.action";
import CategoryList from "../../components/CategoryList/CategoryList";

const CategoryListPage = ({ getCategoryList, category }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (category.length === 0) {
      getCategoryList();
    }
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

const mapStateToProps = (state) => ({
  category: state.landing.category,
});

export default connect(mapStateToProps, { getCategoryList })(CategoryListPage);
