import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import CategoryList from "../../components/CategoryList/CategoryList";
import Layout from "../../components/Shared/Layout/Layout";

const CategoryListPage = ({ getCategoryList, category }) => {
  useEffect(() => {
    if (category.length === 0) {
      getCategoryList();
    }
  }, []);
  return (
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <div className="d-flex justify-content-between align-items-center pb-3 px-4 flex-column flex-md-row">
          <h3 className="">Categories</h3>
          <Button
            variant="primary"
            className="btn_primary"
            as={Link}
            to="/add-category"
          >
            Add Category
          </Button>
        </div>
        <CategoryList />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.landing.category,
});

export default connect(mapStateToProps, { getCategoryList })(CategoryListPage);
