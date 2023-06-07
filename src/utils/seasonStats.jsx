import axios from "axios";

const nflUrl = "/api/nfl/odds/json/TeamSeasonStats/2022REG";
const headers = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  "Content-Type": "application/json",
};

async function getSeasonStats(week) {
  try {
    const api = axios.create({
      baseURL: import.meta.env.VITE_NFL_URL,
    });
    const response = await api.get(nflUrl, { headers });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default getSeasonStats;
