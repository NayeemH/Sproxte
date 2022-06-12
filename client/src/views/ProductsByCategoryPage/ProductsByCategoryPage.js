import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { getCategoryProduct } from "../../actions/Landing.action";
import CategoryProducts from "../../components/CategoryProducts/CategoryProducts";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";

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
      <NewLayout>
        {loading ? (
          <div
            className=" d-flex justify-content-center align-items-center bg-light"
            style={{ minHeight: "40vh", zIndex: 999 }}
          >
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <>
            {list && list.length === 0 ? (
              <div
                className=" d-flex justify-content-center align-items-center bg-light"
                style={{ minHeight: "40vh", zIndex: 999 }}
              >
                <span className="lead fs-3">No Products Found</span>
              </div>
            ) : (
              <CategoryProducts
                name={selectedCat ? selectedCat.name : "Loading..."}
                data={list}
              />
            )}
          </>
        )}
      </NewLayout>
      {/* <BottomNav /> */}
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
