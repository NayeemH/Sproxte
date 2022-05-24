import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getRefreshToken } from "../actions/Auth.action";

const PrivateOutlet = ({ getRefreshToken, auth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const refFunc = async () => {
      if (auth === null || auth === false) {
        let check = await getRefreshToken();
        if (check === true) {
          return <Outlet />;
        } else {
          navigate("/");
        }
      }
    };
    refFunc();
  }, [auth, getRefreshToken]);
  return auth === null ? <Outlet /> : auth === true ? <Outlet /> : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getRefreshToken })(PrivateOutlet);
