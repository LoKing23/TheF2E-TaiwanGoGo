import GetAuthorizationHeader from "./getApiToken";
import axios from "axios";
const activityRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/",
  headers: GetAuthorizationHeader(),
});
const allCity = [
  "Taipei",
  "NewTaipei",
  "Taoyuan",
  "Taichung",
  "Tainan",
  "Kaohsiung",
  "Keelung",
  "Hsinchu",
  "HsinchuCounty",
  "MiaoliCounty",
  "ChanghuaCounty",
  "NantouCounty",
  "YunlinCounty",
  "ChiayiCounty",
  "Chiayi",
  "PingtungCounty",
  "YilanCounty",
  "HualienCounty",
  "TaitungCounty",
  "KinmenCounty",
  "PenghuCounty",
  "LienchiangCounty",
];
export const getRandomActivityByCity = () => {
  const randomIndex = Math.floor(Math.random() * allCity.length);
  const city = allCity[randomIndex];
  const randomSpot = Math.floor(Math.random() * 10) + 1;
  return activityRequest.get(
    `${city}?
      $select=ActivityName,StartTime,EndTime,City,Picture&
      $top=${randomSpot}&
      $skip=${randomSpot - 1}&
      $format=JSON`,
  );
};
export const getActivityByCity = (city = allCity[0], filter = "") => {
  return activityRequest.get(`${city}?${filter}$format=JSON`);
};
