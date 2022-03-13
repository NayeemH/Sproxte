import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTemplate } from "../../actions/Cart.action";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import { ReadyUpload } from "../../components/ReadyUpload";

const FileUploadPageReady = ({ getTemplate, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getTemplate(id);
  }, []);
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <ReadyUpload product={product} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.landing.selected_template,
});

export default connect(mapStateToProps, { getTemplate })(FileUploadPageReady);
