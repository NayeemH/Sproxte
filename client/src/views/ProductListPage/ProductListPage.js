import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjectsList } from "../../actions/Project.action";
import ProductList from "../../components/ProductList/ProductList";
import Layout from "../../components/Shared/Layout/Layout";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjectsList());
  }, []);
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout>
        <div className="d-flex justify-content-between align-items-center pb-3 px-4 flex-column flex-md-row">
          <h3 className="">Products</h3>
          <Button
            variant="primary"
            className="btn_primary"
            as={Link}
            to="/add-product"
          >
            Add Product
          </Button>
        </div>
        <ProductList />
      </Layout>
    </div>
  );
};

export default ProductListPage;
