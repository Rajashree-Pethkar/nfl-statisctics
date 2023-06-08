import React, { useEffect, useState } from "react";
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
  const [preGameLabels, setPreGameLabels] = useState([]);
  const [preGameHomeData, setPreGameHomeData] = useState(null);
  const [preGameAwayData, setPreGameAwayData] = useState(null);

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
  let labels = [];

  const calculateDataAverageForChart = () => {
    labels = [];
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
      labels.push(date);
    });

    Object.keys(averagesAwayPoints).forEach((date) => {
      const values = averagesAwayPoints[date];
      const average =
        values.reduce((sum, value) => sum + value, 0) / values.length;
      averagesAwayTeam[date] = average;
    });

    setPreGameHomeData(averagesHomeTeam);
    setPreGameAwayData(averagesAwayTeam);
    setPreGameLabels(labels);
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
    labels: preGameLabels,
    datasets: [
      {
        label: "Home Point Spread",
        data: preGameHomeData,
        borderColor: "white",
        backgroundColor: "red",
      },
      {
        label: "Away Point Spread",
        data: preGameAwayData,
        borderColor: "white",
        backgroundColor: "blue",
      },
    ],
  };

  console.log(data);
  console.log(options);
  console.log(labels);

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
