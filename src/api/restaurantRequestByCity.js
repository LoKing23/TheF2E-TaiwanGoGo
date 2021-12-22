import axios from "axios";
import GetAuthorizationHeader from "./getApiToken";
const restaurantRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/",
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

export const getRandomRestaurantByCity = () => {
  const randomIndex = Math.floor(Math.random() * allCity.length);
  const city = allCity[randomIndex];
  //隨機前5筆資料
  const randomSpot = Math.floor(Math.random() * 5) + 1;
  return restaurantRequest.get(
    `${city}?
      $select=Name,City,Picture&
      $top=${randomSpot}&
      $skip=${randomSpot - 1}&
      $format=JSON`,
  );
};
export const getRestaurantByCity = (city = allCity[0], filter = "") => {
  console.log(city);
  console.log("getRandomRestaurantByCity", filter);
  return restaurantRequest.get(`${city}?${filter}&$format=JSON`);
};
