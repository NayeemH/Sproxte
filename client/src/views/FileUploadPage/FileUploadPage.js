import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/Cart.action";
import UploadFiles from "../../components/UploadFiles/UploadFiles";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LandingSlider from "../../components/LandingSlider/LandingSlider";

const FileUploadPage = ({ getProduct, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <div className={`wrapper_custom px-md-4 px-2`}>
      <LandingNavbar />
      <div className="d-flex justify-content-start align-items-center">
        <UploadFiles product={product} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.cart.selected_cart,
});

export default connect(mapStateToProps, { getProduct })(FileUploadPage);
