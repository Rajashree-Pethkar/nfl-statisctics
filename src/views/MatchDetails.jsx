import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MatchDetails() {
    const location = useLocation();
    const filteredHomeTeam = location.state?.filteredHomeTeam || [];
    const filteredAwayTeam = location.state?.filteredAwayTeam || [];
    const seasonTeamHomeData = location.state?.seasonTeamHomeData || [];
    const seasonTeamAwayData = location.state?.seasonTeamAwayData || [];
    const weekTeamData = location.state?.weekTeamData || [];
    
    const navigateTo = useNavigate();

    const handleButtonClick = () => {
      navigateTo(`/oddsmovement`, {
        state: {
          weekTeamData,
        },
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

    let sacksHomeTeamAvg =
      seasonTeamHomeData.Sacks / seasonTeamHomeData.Games;
    let sacksAwayTeamAvg =
      seasonTeamAwayData.Sacks / seasonTeamAwayData.Games;

    return (
      <div className="container mt-5 border border-light">
        <div className="row mt-4 pb-4 border-bottom">
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
        <div className="row mt-4 border-bottom">
          <div className="col text-center">
            <p>{offensiveYardsHomeTeamAvg.toFixed(2)}</p>
          </div>
          <div className="col text-center">Offensive Yards</div>
          <div className="col text-center">
            {offensiveYardsAwayTeamAvg.toFixed(2)}
          </div>
        </div>
        <div className="row mt-4 border-bottom">
          <div className="col text-center">
            <p>{rushingYardsHomeTeamAvg.toFixed(2)}</p>
          </div>
          <div className="col text-center">Rushing Yards</div>
          <div className="col text-center">
            {rushingYardsAwayTeamAvg.toFixed(2)}
          </div>
        </div>
        <div className="row mt-4 border-bottom">
          <div className="col text-center">
            <p>{passingYardsHomeTeamAvg.toFixed(2)}</p>
          </div>
          <div className="col text-center">Passing Yards</div>
          <div className="col text-center">
            {passingYardsAwayTeamAvg.toFixed(2)}
          </div>
        </div>
        <div className="row mt-4 border-bottom">
          <div className="col text-center">
            <p>{thirdDownHomeTeamAvg.toFixed(2)}</p>
          </div>
          <div className="col text-center">Third Down Conversions</div>
          <div className="col text-center">
            {thirdDownAwayTeamAvg.toFixed(2)}
          </div>
        </div>
        <div className="row mt-4 border-bottom">
          <div className="col text-center">
            <p>{sacksHomeTeamAvg.toFixed(2)}</p>
          </div>
          <div className="col text-center">Sacks</div>
          <div className="col text-center">{sacksAwayTeamAvg.toFixed(2)}</div>
        </div>
        <div className="row mt-4 pb-4">
          <div className="col text-center">
            <button
              type="button"
              className="text-light btn btn-secondary"
              onClick={handleButtonClick}>
              Odds Movement
            </button>
          </div>
        </div>
      </div>
    );
}