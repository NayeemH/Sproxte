import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import EditCategoryForm from "../../components/EditCategoryForm/EditCategoryForm";
import Layout from "../../components/Shared/Layout/Layout";

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
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        <h4 className="px-5">{data && data.name}</h4>
        <EditCategoryForm data={data} />
      </Layout>
    </div>
  );
};

export default connect(null, { getCategoryList })(EditCategoryPage);
