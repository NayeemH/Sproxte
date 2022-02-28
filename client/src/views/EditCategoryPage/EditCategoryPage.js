import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import EditCategoryForm from "../../components/EditCategoryForm/EditCategoryForm";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./EditCategoryPage.module.css";

const EditCategoryPage = ({ getCategoryList }) => {
  const { id } = useParams();
  const data = useSelector(
    (state) => state.landing.category.filter((item) => item._id === id)[0]
  );
  useEffect(() => {
    if (!data) {
      getCategoryList();
    }
  }, [id, data]);
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
          Edit Category
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {data && data.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <EditCategoryForm data={data} />
    </div>
  );
};

export default connect(null, { getCategoryList })(EditCategoryPage);
