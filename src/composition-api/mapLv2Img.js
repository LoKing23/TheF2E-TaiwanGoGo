export default function mapLv2Img(Lv2ImgData = { className: "", totalNum: 0 }) {
  //根據className 與 照片數量動態取得圖片路徑
  return new Promise((resole, reject) => {
    const { className, totalNum } = Lv2ImgData;
    const pathArr = [];
    let resoleNum = 0;
    for (let i = 0; i < totalNum; i++) {
      import(`@/assets/LV2-img/${className}/bg${i + 1}.png`)
        .then((res) => {
          pathArr[i] = res.default;
          resoleNum++;
          if (resoleNum === totalNum) {
            resole(pathArr);
          }
        })
        .catch((err) => {
          const error = {
            error_message: "mapLv2Img圖片載入失敗",
          };
          reject(error);
        });
    }
  });
}
