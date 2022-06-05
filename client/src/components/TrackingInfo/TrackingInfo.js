import { connect } from "react-redux";
import { Timeline } from "@mantine/core";
import { Spinner } from "react-bootstrap";
import { TiPointOfInterest } from "react-icons/ti";
import Moment from "react-moment";
import styles from "./TrackingInfo.module.scss";
import { useEffect } from "react";
import { getTrackingInfo } from "../../actions/Payment.acton";

const TrackingInfo = ({ info, id, getTrackingInfo, tracking }) => {
  useEffect(() => {
    getTrackingInfo(id);
  }, [id]);
  return (
    <div>
      {info === null || id !== info.orderId ? (
        <div
          style={{ minHeight: 400 }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            {info.trackingInfo.map((item) => (
              <Timeline.Item
                bullet={<TiPointOfInterest size={12} />}
                title={item.eventDescription}
              >
                <span className="d-block ">
                  <Moment ago>{item.date}</Moment>
                </span>
              </Timeline.Item>
            ))}
          </Timeline>
          <hr />
          <div className="text-center">
            Tracking ID: <b>{tracking}</b>
          </div>
        </>
      )}
      <hr />
      <div className="text-center">
        Tracking ID: <b>{tracking}</b>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  info: state.order.tracking_info,
});

export default connect(mapStateToProps, { getTrackingInfo })(TrackingInfo);
