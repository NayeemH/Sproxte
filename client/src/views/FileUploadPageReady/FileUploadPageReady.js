import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTemplate } from "../../actions/Cart.action";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import { ReadyUpload } from "../../components/ReadyUpload";
import BgProvider from "../../components/Shared/BgProvider/BgProvider";

const FileUploadPageReady = ({ getTemplate, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getTemplate(id);
  }, []);
  return (
    <BgProvider className={` px-md-4 px-2`}>
      <LandingNavbar />
      <div className="d-flex justify-content-start align-items-center">
        <ReadyUpload product={product} />
      </div>
    </BgProvider>
  );
};

const mapStateToProps = (state) => ({
  product: state.landing.selected_template,
});

export default connect(mapStateToProps, { getTemplate })(FileUploadPageReady);
