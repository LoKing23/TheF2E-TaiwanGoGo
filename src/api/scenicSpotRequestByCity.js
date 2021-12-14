import axios from "axios";
import GetAuthorizationHeader from "./getApiToken";
const scenicSpotRequestByCity = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/",
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

// 取得隨機城市的景點
export const getRandomSpotByCity = () => {
  const randomIndex = Math.floor(Math.random() * allCity.length);
  const city = allCity[randomIndex];
  //隨機前30筆景點，少於30筆會出錯
  const randomSpot = Math.floor(Math.random() * 30) + 1;

  return scenicSpotRequestByCity.get(
    `${city}?
      $select=Name,City,Picture&
      $top=${randomSpot}&
      $skip=${randomSpot - 1}&
      $format=JSON`,
  );
};
