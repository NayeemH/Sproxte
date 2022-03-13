import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TypeList from "../../components/TypeList/TypeList";
import { getTypeList } from "../../actions/Landing.action";
import Layout from "../../components/Shared/Layout/Layout";

const TypeListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypeList());
  }, []);
  return (
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <div className="d-flex justify-content-between align-items-center pb-3 px-4">
          <h3 className="">Templates</h3>
          <Button
            variant="primary"
            className="btn_primary"
            as={Link}
            to="/add-template"
          >
            Add Template
          </Button>
        </div>

        <TypeList />
      </Layout>
    </div>
  );
};

export default TypeListPage;
