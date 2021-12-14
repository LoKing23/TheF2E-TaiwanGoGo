export default async function getApiByTimes(api, num = 4) {
  const arr = [];
  while (arr.length < num) {
    let data = await api();
    //濾掉缺圖的景點
    if (!data.data[0]) continue;
    if (data.data[0].Picture.PictureUrl1) arr.push(data.data[0]);
  }
  return arr;
}
