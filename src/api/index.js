import { getRandomSpotByCity } from "./scenicSpotRequestByCity";
import { getRandomRestaurantByCity } from "./restaurantRequestByCity";
import { getRandomActivityByCity } from "./activityRequestByCity";
//by city
// 1取得隨機景點
export const apiGetRandomSpotByCity = getRandomSpotByCity;
// 2取得隨機餐廳
export const apiGetRandomRestaurantByCity = getRandomRestaurantByCity;
// 3取得隨機活動
export const apiGetRandomActivityByCity = getRandomActivityByCity;
