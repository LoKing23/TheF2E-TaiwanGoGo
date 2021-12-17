import axios from "axios";
import GetAuthorizationHeader from "./getApiToken.js";
const scenicSpotRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot",
  headers: GetAuthorizationHeader(),
});

export const getScenicSpot = (filter) => {
  console.log("ScenicSpot", filter);
  return scenicSpotRequest.get(`?${filter}&$format=JSON`);
};
