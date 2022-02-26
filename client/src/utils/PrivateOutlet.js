import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getRefreshToken } from "../actions/Auth.action";

const PrivateOutlet = ({ getRefreshToken, auth, loading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth === false) {
      // true should be replaced by refresh token function
      let check = getRefreshToken();
      if (check === true) {
        return <Outlet />;
      } else {
        navigate("/");
      }
    }
  }, [auth, getRefreshToken]);
  return auth === true && loading === false ? <Outlet /> : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getRefreshToken })(PrivateOutlet);
