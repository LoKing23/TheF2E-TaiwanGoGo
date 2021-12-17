export default function mapLv2Img(
  classNameArr,
  Lv2ImgData = { className: "", totalNum: 0 },
) {
  //動態調用import用法，之後改良
  // async function getImg(name) {
  //   const result = await import(`@/assets/LV2-img/Activity/${name}.png`);
  //   img.value = result.default;
  // }
  const { className, totalNum } = Lv2ImgData;
  const getImgPathfromLv2Img = (className, totalNum) => {
    const filePath = `/assets/LV2-img/${className}`;
    const pathArr = [];
    for (let i = 0; i < totalNum; i++) {
      pathArr.push(`${filePath}/bg${i + 1}.png`);
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
