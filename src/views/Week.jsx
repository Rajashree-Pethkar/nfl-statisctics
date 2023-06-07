import React, { useState, useEffect, useReducer } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import getTeamGameStats from '../utils/gameStats';
import getTeamInfo from '../utils/teamInfo';
import getSeasonStats from '../utils/seasonStats';
import MatchCard from './MatchCard';
import getWeekInfo from '../utils/weekInfo';

function teamReducer(teamData, action) {
  switch (action.type) {
    case 'getTeamData':
      return [...teamData, action.payload.teamData];
    default:
      return teamData;
  }
}

function seasonReducer(seasonData, action) {
  switch (action.type) {
    case 'getSeasonData':
      return [...seasonData, action.payload.seasonData];
    default:
      return seasonData;
  }
}

function Week() {
  let defaultYear = new Date().getFullYear();
  const current_date = new Date();
  const week2Date = new Date(defaultYear, 9, 13);
  if (current_date <= week2Date) {
    defaultYear = defaultYear - 1;
  }

  const [season, setSeason] = useState(defaultYear);
  const [week, setWeek] = useState('1');
  const [weekData, setWeekData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [teamData, dispatchTeamData] = useReducer(teamReducer, []);
  const [seasonData, dispatchSeasonData] = useReducer(seasonReducer, []);

  useEffect(() => {
    getTeamGameStats(season, week).then((gameData) => setGameData(gameData));
    getWeekInfo(season, week).then((seasonInfo) => setWeekData(seasonInfo));
  }, [season, week]);

  useEffect(() => {
    getTeamInfo().then((teamData) =>
      dispatchTeamData({ type: 'getTeamData', payload: { teamData: teamData } })
    );
    getSeasonStats(season).then((seasonData) =>
      dispatchSeasonData({
        type: 'getSeasonData',
        payload: { seasonData: seasonData },
      })
    );
  }, []);

  const handleWeekChange = (event) => {
    const buttonName = event.target.textContent;
    setWeek(buttonName.replace(/^\D+/g, ''));
  };

  const handleSeasonChange = (event) => {
    const buttonName = event.target.textContent;
    setSeason(buttonName.replace(/^\D+/g, ''));
  };

  return (
    <main className="container">
      <h1>{season}</h1>
      <h1>Week {week}</h1>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Choose Season
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={handleSeasonChange}>
            2022
          </button>

          <button className="dropdown-item" onClick={handleSeasonChange}>
            2023
          </button>
        </div>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Choose Week
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 1
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 2
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 3
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 4
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 5
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 6
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 7
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 8
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 9
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 10
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 11
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 12
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 13
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 14
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 15
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 16
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 17
          </button>
          <button className="dropdown-item" onClick={handleWeekChange}>
            Week 18
          </button>
        </div>
      </div>
      <div className="row row-cols-6 justify-content-around">
        {!weekData && (
          <div className="loader-container">
            <ClipLoader color={'white'} size={75} />
          </div>
        )}
        {weekData &&
          teamData[0] &&
          seasonData[0] &&
          weekData.map((game, gameData) => {
            return (
              <MatchCard
                key={game.GameKey.concat(game.HomeTeamID)}
                week={game}
                teamData={teamData}
                seasonData={seasonData}
                weekData={weekData}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Week;
