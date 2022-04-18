import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTemplateShare } from "../../actions/Cart.action";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import { ReadyUpload } from "../../components/ReadyUpload";
import styles from "./SharePage.module.scss";

const SharePage = ({ product, getTemplateShare }) => {
  const { id } = useParams();
  useEffect(() => {
    getTemplateShare(id);
  }, []);
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <ReadyUpload product={{ pngImageFront: product.image, ...product }} />
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => ({
  product: state.landing.selected_template,
});
export default connect(mapStateToProps, { getTemplateShare })(SharePage);
