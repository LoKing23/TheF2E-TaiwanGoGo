# 工作記錄

## 首頁
完成度80%
缺少：
- loading過場
- 優化random系列的api，一次可以打多筆
- api錯誤處理
- 大輪播切換時的切角細節
- intro的搜尋 （大工程）
L2資料必須用vuex串接，不然挺麻煩的
## LV2頁面
完成度70%
待解決:
1. api篩不出時間
2. 有給網址但掛掉的圖片要處理
3. api錯誤處理
4. 麵包屑要可以回到熱門選項
5. pagination處理（大工程）

已解決
1. 圖片加載失敗時設置替換圖片 -> directive
2. 搜尋結果location為see the official site時改為中文
2,3可時用computed先處理也可以使用directive來處理 -> 1,2使用computed篩掉




## Lv3頁面
完成度40%
各個api的資訊不一致，使用v-if過濾出不同api顯示的資訊

其他:
- 動態加載圖片從static換成異步import+錯誤處理（現在直接放在static裡）
- github page不使用動態也出不來

資訊欄呈現：
使用v-if控制不同種類的api秀出不同的資訊
以lv2為秀出條件