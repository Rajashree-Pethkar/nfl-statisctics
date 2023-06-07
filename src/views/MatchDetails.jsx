import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getOddsStats from "../utils/oddsStats";
import Error from "./Error";

export default function MatchDetails() {
  const location = useLocation();
  const filteredHomeTeam = location.state?.filteredHomeTeam || [];
  const filteredAwayTeam = location.state?.filteredAwayTeam || [];
  const seasonTeamHomeData = location.state?.seasonTeamHomeData || [];
  const seasonTeamAwayData = location.state?.seasonTeamAwayData || [];
  const weekTeamData = location.state?.weekTeamData || [];

  const [error, setError] = useState(null);

  const navigateTo = useNavigate();

  const handleButtonClick = () => {
    let scoreId = weekTeamData.ScoreID;
    getOddsStats(scoreId)
      .then((homeTeamScores) => {
        const homePointSpreadValues = homeTeamScores[0].PregameOdds.map(
          ({ HomePointSpread, Updated }) => ({ HomePointSpread, Updated })
        );
        const awayPointSpreadValues = homeTeamScores[0].PregameOdds.map(
          ({ AwayPointSpread, Updated }) => ({ AwayPointSpread, Updated })
        );

        navigateTo(`/oddsmovement`, {
          state: {
            homePointSpreadValues,
            awayPointSpreadValues,
          },
        });
      })
      .catch((error) => {
        setError("Something went wrong. Please try again!");
      });
  };

  let offensiveYardsHomeTeamAvg =
    seasonTeamHomeData.OffensiveYards / seasonTeamHomeData.Games;
  let offensiveYardsAwayTeamAvg =
    seasonTeamAwayData.OffensiveYards / seasonTeamAwayData.Games;

  let rushingYardsHomeTeamAvg =
    seasonTeamHomeData.RushingYards / seasonTeamHomeData.Games;
  let rushingYardsAwayTeamAvg =
    seasonTeamAwayData.RushingYards / seasonTeamAwayData.Games;

  let passingYardsHomeTeamAvg =
    seasonTeamHomeData.PassingYards / seasonTeamHomeData.Games;
  let passingYardsAwayTeamAvg =
    seasonTeamAwayData.PassingYards / seasonTeamAwayData.Games;

  let thirdDownHomeTeamAvg =
    seasonTeamHomeData.ThirdDownConversions / seasonTeamHomeData.Games;
  let thirdDownAwayTeamAvg =
    seasonTeamAwayData.ThirdDownConversions / seasonTeamAwayData.Games;

  let sacksHomeTeamAvg = seasonTeamHomeData.Sacks / seasonTeamHomeData.Games;
  let sacksAwayTeamAvg = seasonTeamAwayData.Sacks / seasonTeamAwayData.Games;

  const handleClose = () => {
    setError(null);
  };

  return (
    <div className="container mt-5 px-5">
      <div className="row pb-4">
        <h1>Season stats</h1>
      </div>
      <div className="row border-bottom border border-light pt-4 pb-4">
        <img
          className="float-left col"
          style={{ width: "75px", height: "75px", objectFit: "contain" }}
          src={filteredHomeTeam[0].WikipediaLogoUrl}
          alt={filteredHomeTeam[0].Key}
        />
        <h5 className="col mt-4" style={{ textAlign: "center" }}>
          VS
        </h5>
        <img
          className="float-right col"
          style={{ width: "75px", height: "75px", objectFit: "contain" }}
          src={filteredAwayTeam[0].WikipediaLogoUrl}
          alt={filteredAwayTeam[0].Key}
        />
      </div>
      <div className="row border-bottom border border-light pt-4">
        <div className="col text-center">
          <p>{offensiveYardsHomeTeamAvg.toFixed(2)}</p>
        </div>
        <div className="col text-center">Offensive Yards</div>
        <div className="col text-center">
          {offensiveYardsAwayTeamAvg.toFixed(2)}
        </div>
      </div>
      <div className="row border-bottom border border-light pt-4">
        <div className="col text-center">
          <p>{rushingYardsHomeTeamAvg.toFixed(2)}</p>
        </div>
        <div className="col text-center">Rushing Yards</div>
        <div className="col text-center">
          {rushingYardsAwayTeamAvg.toFixed(2)}
        </div>
      </div>
      <div className="row border-bottom border border-light pt-4">
        <div className="col text-center">
          <p>{passingYardsHomeTeamAvg.toFixed(2)}</p>
        </div>
        <div className="col text-center">Passing Yards</div>
        <div className="col text-center">
          {passingYardsAwayTeamAvg.toFixed(2)}
        </div>
      </div>
      <div className="row border-bottom border border-light pt-4">
        <div className="col text-center">
          <p>{thirdDownHomeTeamAvg.toFixed(2)}</p>
        </div>
        <div className="col text-center">Third Down Conversions</div>
        <div className="col text-center">{thirdDownAwayTeamAvg.toFixed(2)}</div>
      </div>
      <div className="row border-bottom border border-light pt-4">
        <div className="col text-center">
          <p>{sacksHomeTeamAvg.toFixed(2)}</p>
        </div>
        <div className="col text-center">Sacks</div>
        <div className="col text-center">{sacksAwayTeamAvg.toFixed(2)}</div>
      </div>
      <div className="row border pb-4 pt-4">
        <div className="col text-center">
          <button
            type="button"
            className="text-light btn btn-secondary"
            onClick={handleButtonClick}>
            Odds Movement
          </button>
        </div>
      </div>
      {error && <Error ifError={error} onClose={handleClose}/>}
    </div>
  );
}
