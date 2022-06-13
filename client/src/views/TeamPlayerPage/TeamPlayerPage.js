import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { getCountryList, getPaymentDetails } from "../../actions/Order.action";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";
import { Spinner } from "react-bootstrap";
import AdminInvoice from "../../components/AdminInvoice/AdminInvoice";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";
import { getTeamPlayerList } from "../../actions/Landing.action";
import TeamPlayers from "../../components/TeamPlayers/TeamPlayers";

const TeamPlayerPage = ({ team, getTeamPlayerList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getTeamPlayerList(id);

    if (!id) {
      navigate("/");
    }
  }, [id]);
  return (
    <div>
      <NewLayout>
        {team !== null ? (
          <TeamPlayers team={team} />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Spinner variant="dark" animation="grow" />
          </div>
        )}
      </NewLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.landing.selected_team,
});

export default connect(mapStateToProps, { getTeamPlayerList })(TeamPlayerPage);
