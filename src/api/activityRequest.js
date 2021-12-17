import axios from "axios";
import GetAuthorizationHeader from "./getApiToken";

const activityRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity",
  headers: GetAuthorizationHeader(),
});

export const getActivity = (filter = "") => {
  console.log(filter);
  console.log("headers: ", GetAuthorizationHeader());
  return activityRequest.get(`?${filter}&$format=JSON`);
};
