import axios from "axios";

const nflUrl = "/api/nfl/odds/json/GameOddsLineMovement/";
const headers = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  "Content-Type": "application/json",
};

async function getOddsStats(scoreid) {
  try {
    const api = axios.create({
      baseURL: import.meta.env.VITE_NFL_URL,
    });
    let oddsUrl = nflUrl.concat(scoreid);
    const response = await api.get(oddsUrl, { headers });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default getOddsStats;