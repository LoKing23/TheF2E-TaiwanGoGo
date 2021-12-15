export default function mapLv2Img(
  classNameArr,
  Lv2ImgData = { className: "", totalNum: 0 },
) {
  const { className, totalNum } = Lv2ImgData;
  const getImgPathfromLv2Img = (className, totalNum) => {
    const filePath = `@/assets/LV2-img/${className}`;
    const pathArr = [];
    for (let i = 0; i < totalNum; i++) {
      pathArr.push(`require('${filePath}/bg${i + 1}.png')`);
    }
    return pathArr;
  };

  const mapClassNameAndImgPath = () => {
    const imgPathArr = getImgPathfromLv2Img(className, totalNum);
    const hotClass = imgPathArr.map((item, index) => {
      return {
        className: classNameArr[index],
        imgUrl: item,
      };
    });
    return hotClass;
  };
  return mapClassNameAndImgPath();
}
