import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getFeature } from "../../actions/Landing.action";
import DiscoverList from "../../components/DiscoverList/DiscoverList";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";
const queryString = require("query-string");

const FeatureListPage = ({ getFeature, list }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  let page = 1;

  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    getFeature(page);
  }, [parsed.page]);
  return (
    <div>
      <LandingSidebar />
      <Nav />
      <DiscoverList
        name="feature"
        title="FEATURED TEMPLATES"
        list={list}
        page={parsed.page ? parsed.page : 1}
      />
      {/* <BottomNav /> */}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.landing.discover_popular,
});

export default connect(mapStateToProps, { getFeature })(FeatureListPage);
