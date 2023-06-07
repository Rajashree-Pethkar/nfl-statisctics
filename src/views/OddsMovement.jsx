import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getOddsStats from "../utils/oddsStats";
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
    const weekTeamData = location.state?.weekTeamData || [];

    const [scoreHomeTeamData, setScoreHomeTeamData] = useState([]);
    let scoreId = weekTeamData.ScoreID;

    const [homePointSpreadData, setHomePointSpreadData] = useState([]);
    const [awayPointSpreadData, setAwayPointSpreadData] = useState([]);

    useEffect(() => {
        getOddsStats(scoreId).then((homeTeamScores) => {
        setScoreHomeTeamData(homeTeamScores);

        const homePointSpreadValues = homeTeamScores[0].PregameOdds.map(
            (score) => score.HomePointSpread
        );
        const awayPointSpreadValues = homeTeamScores[0].PregameOdds.map(
            (score) => score.AwayPointSpread
        );

        setHomePointSpreadData(homePointSpreadValues);
        setAwayPointSpreadData(awayPointSpreadValues);
        });
    }, [scoreId]);

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Odds Movement",
        },
        },
    };

    const data = {
        datasets: [
        {
            label: "Home Point Spread",
            data: homePointSpreadData,
            borderColor: "white",
            backgroundColor: "red",
        },
        {
            label: "Away Point Spread",
            data: awayPointSpreadData,
            borderColor: "white",
            backgroundColor: "blue",
        },
        ],
    };

    return (
        <div className="text-center">
        <div>
            <Line data={data} options={options} />
        </div>
        </div>
    );
}
