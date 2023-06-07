import React from "react";
import { useNavigate } from "react-router-dom";

export default function MatchCard({ week, teamData, gameData, seasonData, weekData }) {
  const homeTeam = week["HomeTeam"];
  const awayTeam = week["AwayTeam"];
  let homeTeamIMG;
  let awayTeamIMG;
  let homeEarnedPoints;
  let awayEarnedPoints;
  let homeGivenPoints;
  let awayGivenPoints;

  let seasonTeamHomeData;
  let seasonTeamAwayData;
  let weekTeamData;

  teamData[0].map((team) => {
    if (team.Key === homeTeam) {
      homeTeamIMG = team.WikipediaLogoUrl;
    }
    if (team.Key === awayTeam) {
      awayTeamIMG = team.WikipediaLogoUrl;
    }
  });
  seasonData[0].map((total) => {
    if (total.Team === homeTeam) {
      homeEarnedPoints = (total.Score / total.Games).toFixed(2);
      homeGivenPoints = (total.OpponentScore / total.Games).toFixed(2);
    }
    if (total.Team === awayTeam) {
      awayEarnedPoints = (total.Score / total.Games).toFixed(2);
      awayGivenPoints = (total.OpponentScore / total.Games).toFixed(2);
    }
  });

  const homeDiff = parseFloat((awayGivenPoints - homeEarnedPoints) / 2).toFixed(
    2
  );
  const awayDiff = parseFloat((homeGivenPoints - awayEarnedPoints) / 2).toFixed(
    2
  );
  const homePrediction = Math.round(
    parseFloat(Number(homeEarnedPoints) + Number(homeDiff)).toFixed(2)
  );
  const awayPrediction = Math.round(
    parseFloat(Number(awayEarnedPoints) + Number(awayDiff)).toFixed(2)
  );

  const navigateTo = useNavigate();

  const handleClick = (homeTeam, awayTeam, seasonData) => {
    const filteredHomeTeam = teamData[0].filter((team) => {
      return team.Key === homeTeam;
    });
    const filteredAwayTeam = teamData[0].filter((team) => {
      return team.Key === awayTeam;
    });

    seasonData[0].map((seasonTeam) => {
      if (seasonTeam.Team === homeTeam) {
        seasonTeamHomeData = seasonTeam;
      }
      if (seasonTeam.Team === awayTeam) {
        seasonTeamAwayData = seasonTeam;
      }
    });

    weekData.map((weekTeam) => {
      if (weekTeam.HomeTeam === homeTeam && weekTeam.AwayTeam) {
        weekTeamData = weekTeam;
      }
    });

    // Navigate to match details
    navigateTo(`/matchdetails`, {
      state: {
        filteredHomeTeam,
        filteredAwayTeam,
        seasonTeamHomeData,
        seasonTeamAwayData,
        weekTeamData
      },
    });
  };

  return (
    <div id="match-card"
      onClick={() => handleClick(homeTeam, awayTeam, seasonData)}
      className="card col my-3"
      style={{ width: "18rem", borderWidth: "5px" }}>
      <div className="row">
        <img
          className="float-left col mt-4"
          style={{ width: "75px", height: "75px", objectFit: "contain" }}
          src={homeTeamIMG}
          alt={homeTeam}
        />
        <h5 className="mt-5 col " style={{ textAlign: "center" }}>
          VS
        </h5>
        <img
          className="float-right col mt-4"
          style={{ width: "75px", height: "75px", objectFit: "contain" }}
          src={awayTeamIMG}
          alt={awayTeam}
        />
      </div>
      <div className="row card-body">
        <h6
          className="card-text text-justify-left col"
          style={{ textAlign: "center" }}>
          {homeTeam}
        </h6>
        <div className="mx-5 col"></div>
        <h6
          className="card-text text-justify-right col"
          style={{ textAlign: "center" }}>
          {awayTeam}
        </h6>
      </div>
      <div className="row data-body">
        <p
          className="card-text text-justify-left col"
          style={{ textAlign: "center" }}>
          {homeEarnedPoints}
        </p>
        <div className="col" style={{ textAlign: "center" }}>
          Pts.
        </div>
        <p
          className="card-text text-justify-right col"
          style={{ textAlign: "center" }}>
          {awayEarnedPoints}
        </p>
      </div>
      <div className="row data-body">
        <p
          className="card-text text-justify-left col"
          style={{ textAlign: "center" }}>
          {homeGivenPoints}
        </p>
        <div className="col" style={{ textAlign: "center" }}>
          Opp. Pts.
        </div>
        <p
          className="card-text text-justify-right col"
          style={{ textAlign: "center" }}>
          {awayGivenPoints}
        </p>
      </div>
      <div className="row data-body">
        <p
          className="card-text text-justify-left col"
          style={{
            textAlign: "center",
          }}>
          {homeDiff}
        </p>
        <div className="col" style={{ textAlign: "center" }}>
          Diff.
        </div>
        <p
          className="card-text text-justify-right col"
          style={{
            textAlign: "center",
          }}>
          {awayDiff}
        </p>
      </div>
      <div className="row data-body">
        <p
          className="card-text text-justify-left col"
          style={{
            textAlign: "center",
            background: homePrediction > awayPrediction ? "green" : "#B8262D",
            margin: "0",
          }}>
          {homePrediction}
        </p>
        <div className="col" style={{ textAlign: "center" }}>
          Prediction
        </div>
        <p
          className="card-text text-justify-right col"
          style={{
            textAlign: "center",
            background: awayPrediction > homePrediction ? "green" : "#B8262D",
          }}>
          {awayPrediction}
        </p>
      </div>
    </div>
  );
}
