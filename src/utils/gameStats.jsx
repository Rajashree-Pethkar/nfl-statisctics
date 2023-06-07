import axios from "axios";

const nflUrl = "/api/nfl/odds/json/TeamGameStats/2022REG/";
const headers = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  "Content-Type": "application/json",
};

async function getTeamGameStats(week) {
  try {
    const response = await axios.get(nflUrl.concat(week), { headers });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default getTeamGameStats;
