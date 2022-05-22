import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTemplate } from "../../actions/Cart.action";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import { ReadyUpload } from "../../components/ReadyUpload";

const FileUploadPageReady = ({ getTemplate, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getTemplate(id);
  }, []);
  return (
    <div className={`wrapper_custom px-md-4 px-2`}>
      <LandingNavbar />
      <div className="d-flex justify-content-start align-items-center">
        <ReadyUpload product={product} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.landing.selected_template,
});

export default connect(mapStateToProps, { getTemplate })(FileUploadPageReady);
