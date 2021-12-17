import { getRandomSpotByCity, getSpotByCity } from "./scenicSpotRequestByCity";
import {
  getRandomRestaurantByCity,
  getRestaurantByCity,
} from "./restaurantRequestByCity";
import {
  getRandomActivityByCity,
  getActivityByCity,
} from "./activityRequestByCity";
import { getActivity } from "./activityRequest";
import { getScenicSpot } from "./scenicSpotRequest";
import { getRestaurantRequest } from "./restaurantRequest";

// 活動
// 1.指定條件活動
export const apiGetActivity = getActivity;
// 2.隨機活動 by city
export const apiGetRandomActivityByCity = getRandomActivityByCity;
// 3.指定{地點、條件}
export const apiGetActivityByCity = getActivityByCity;
// 景點
// 1.指定條件景點
export const apiGetScenicSpot = getScenicSpot;
// 2.指定{地點、條件}
export const apiGetSpotByCity = getSpotByCity;
// 3.隨機景點 by city
export const apiGetRandomSpotByCity = getRandomSpotByCity;
// 餐廳
// 1.指定條件餐廳
export const apiGetRestaurantRequest = getRestaurantRequest;
// 2. 隨機餐廳 by city
export const apiGetRandomRestaurantByCity = getRandomRestaurantByCity;
// 3.指定{縣市、條件}餐廳
export const apiGetRestaurantByCity = getRestaurantByCity;
