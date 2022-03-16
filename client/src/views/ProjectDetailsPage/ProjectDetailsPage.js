import React, { useEffect } from "react";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/Project.action";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.selected_project);
  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, [id]);
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
};

export default ProjectDetailsPage;
