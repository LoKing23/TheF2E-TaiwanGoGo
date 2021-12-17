import axios from "axios";
import GetAuthorizationHeader from "./getApiToken.js";
const restaurantRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant",
  headers: GetAuthorizationHeader(),
});

export const getRestaurantRequest = (filter) => {
  console.log("ScenicSpot", filter);
  return restaurantRequest.get(`?${filter}&$format=JSON`);
};
