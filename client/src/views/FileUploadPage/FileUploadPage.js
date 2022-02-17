import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/Cart.action";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
import UploadFiles from "../../components/UploadFiles/UploadFiles";

const FileUploadPage = ({ getProduct, product }) => {
  const { id } = useParams();
  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <UploadFiles product={product} />
      <BottomNav />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.cart.selected_cart,
});

export default connect(mapStateToProps, { getProduct })(FileUploadPage);
