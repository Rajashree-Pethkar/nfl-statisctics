import axios from "axios";

const nflUrl = "/api/nfl/odds/json/ScoresByWeek/";
const headers = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  "Content-Type": "application/json",
};

async function getWeekInfo(season, week) {
  try {
    const api = axios.create({
      baseURL: import.meta.env.VITE_NFL_URL,
    });
    const weekInfoUrl = nflUrl.concat(season).concat("REG/").concat(week);
    const response = await api.get(weekInfoUrl, { headers });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default getWeekInfo;
