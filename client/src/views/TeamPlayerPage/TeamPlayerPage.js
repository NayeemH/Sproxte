import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";
import { getTeamPlayerList } from "../../actions/Landing.action";
import { TeamTypes } from "../../components/TeamTypes";

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
          <div className="d-flex justify-content-start align-items-center">
            <TeamTypes team={team} />
          </div>
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
