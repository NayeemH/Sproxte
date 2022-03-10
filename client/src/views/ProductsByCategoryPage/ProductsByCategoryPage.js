import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { getCategoryProduct } from "../../actions/Landing.action";
import DiscoverList from "../../components/DiscoverList/DiscoverList";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";

const ProductsByCategoryPage = ({
  getCategoryProduct,
  list,
  categories,
  getCategoryList,
  loading,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (categories && categories.length === 0) {
      getCategoryList();
    }
    getCategoryProduct(id);
  }, [id]);

  let selectedCat = categories && categories.filter((cat) => cat._id === id)[0];
  return (
    <div>
      <LandingSidebar />
      <Nav />
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ minHeight: "40vh", zIndex: 999 }}
        >
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
          {list && list.length === 0 ? (
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{ minHeight: "40vh", zIndex: 999 }}
            >
              <span className="lead fs-3">No Products Found</span>
            </div>
          ) : (
            <DiscoverList
              name="feature"
              title={selectedCat ? selectedCat.name : "Loading..."}
              list={{ items: list }}
              page={-1}
            />
          )}
        </>
      )}
      {/* <BottomNav /> */}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.landing.category_products,
  loading: state.landing.loading,
  categories: state.landing.category,
});

export default connect(mapStateToProps, {
  getCategoryProduct,
  getCategoryList,
})(ProductsByCategoryPage);
