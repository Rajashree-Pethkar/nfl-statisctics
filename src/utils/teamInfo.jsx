import axios from "axios";

const nflUrl = "/api/nfl/fantasy/json/Teams";
const headers = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  "Content-Type": "application/json",
};

async function getTeamInfo(week) {
  try {
    const response = await axios.get(nflUrl, {headers});
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default getTeamInfo;
