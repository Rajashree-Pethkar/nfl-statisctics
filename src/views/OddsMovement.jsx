import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GameOddsLineMovement() {
  const location = useLocation();
  const homePointSpreadData = location.state?.homePointSpreadValues || [];
  const awayPointSpreadData = location.state?.awayPointSpreadValues || [];

  let chartStatus = ChartJS.getChart("pregameodds-chart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (homePointSpreadData.length > 0 && awayPointSpreadData.length > 0) {
      calculateDataAverageForChart();
    }
  }, [homePointSpreadData, awayPointSpreadData]);

  // Group data by date
  const averagesHomePoints = {};
  const averagesAwayPoints = {};
  const averagesHomeTeam = {};
  const averagesAwayTeam = {};

  const calculateDataAverageForChart = () => {
    homePointSpreadData.forEach((item) => {
      const { HomePointSpread, Updated } = item;
      const dateTime = new Date(Updated);
      const updatedDate = dateTime.toLocaleDateString();
      if (averagesHomePoints[updatedDate]) {
        averagesHomePoints[updatedDate].push(HomePointSpread);
      } else {
        averagesHomePoints[updatedDate] = [HomePointSpread];
      }
    });
    awayPointSpreadData.forEach((item) => {
      const { AwayPointSpread, Updated } = item;
      const dateTime = new Date(Updated);
      const updatedDate = dateTime.toLocaleDateString();
      if (averagesAwayPoints[updatedDate]) {
        averagesAwayPoints[updatedDate].push(AwayPointSpread);
      } else {
        averagesAwayPoints[updatedDate] = [AwayPointSpread];
      }
    });

    // Calculate the average for each day
    Object.keys(averagesHomePoints).forEach((date) => {
      const values = averagesHomePoints[date];
      const average =
        values.reduce((sum, value) => sum + value, 0) / values.length;
      averagesHomeTeam[date] = average;
    });

    Object.keys(averagesAwayPoints).forEach((date) => {
      const values = averagesAwayPoints[date];
      const average =
        values.reduce((sum, value) => sum + value, 0) / values.length;
      averagesAwayTeam[date] = average;
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: Object.keys(averagesHomePoints),
    datasets: [
      {
        label: "Home Point Spread",
        data: averagesHomeTeam,
        borderColor: "white",
        backgroundColor: "red",
      },
      {
        label: "Away Point Spread",
        data: averagesAwayTeam,
        borderColor: "white",
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <div className="w-75 mx-auto mt-5">
      <div>
        <h1>Odds Movement</h1>
      </div>
      <div className="mt-4">
        <Line id="pregameodds-chart" data={data} options={options} />
      </div>
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-light btn btn-secondary"
          onClick={goBack}>
          Season stats
        </button>
      </div>
    </div>
  );
}
