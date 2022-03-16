import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTypeList } from "../../actions/Landing.action";
import EditProductFinal from "../../components/EditProductFinal/EditProductFinal";
import EditTypeFinal from "../../components/EditTypeFinal/EditTypeFinal";
import Layout from "../../components/Shared/Layout/Layout";

const EditTypePage = ({ getTypeList }) => {
  const { id } = useParams();
  const type = useSelector(
    (state) => state.landing.types.filter((type) => type._id === id)[0]
  );
  useEffect(() => {
    if (!type) {
      getTypeList();
    }
  }, [id, type]);
  return (
    <div className={`bg_dark`} style={{ minHeight: "100vh" }}>
      <Layout>
        {/* <h4 className="px-5">{type && type.name}</h4> */}
        {type && <EditTypeFinal data={type} />}
      </Layout>
    </div>
  );
};

export default connect(null, { getTypeList })(EditTypePage);
