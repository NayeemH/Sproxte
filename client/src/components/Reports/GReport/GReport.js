import React from "react";
import { clientID } from "../../../constants/URL";
import {
  AnalyticsDashboard,
  SessionsByDateChart,
  SessionsGeoChart,
  SessionsBySourceChart,
  SessionsByHourChart,
  PageViewsPerPathChart,
} from "react-analytics-charts";
import {} from "react-analytics-charts";
const GReport = () => {
  return (
    <div>
      <AnalyticsDashboard
        authOptions={{ clientId: clientID }}
        chartsAppearFirst={true}
        // viewId="ga:309832080"
        // hideViewSelector={true}
        renderCharts={(gapi, viewId) => {
          const chartStyles = {
            margin: "15px",
            maxWidth: 900,
          };
          return (
            <div>
              <SessionsByDateChart
                gapi={gapi}
                viewId={viewId}
                style={chartStyles}
                showPageViews
                showUsers
              />
              <SessionsGeoChart
                gapi={gapi}
                viewId={viewId}
                style={chartStyles}
                showPageViews
                options={{ width: 400 }}
              />
              <SessionsBySourceChart
                gapi={gapi}
                viewId={viewId}
                style={chartStyles}
              />
              <SessionsByHourChart
                gapi={gapi}
                viewId={viewId}
                style={chartStyles}
              />
              <PageViewsPerPathChart
                gapi={gapi}
                viewId={viewId}
                style={{ margin: "15px" }}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default GReport;
