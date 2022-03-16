import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/Project.action";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Layout from "../../components/Shared/Layout/Layout";

const ProjectDetailsPage = ({ getProjectDetails, project }) => {
  const { id } = useParams();

  useEffect(() => {
    getProjectDetails(id);
  }, [id]);
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        <OrderDetails data={project} id={id} />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project.selected_project,
});

export default connect(mapStateToProps, { getProjectDetails })(
  ProjectDetailsPage
);
