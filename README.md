# Australia 2026 Web App Clean v3

這版依 Cheryl 的使用者體驗回饋修正：

- 移除每日頁面下方重複的 Quick Action Row。
- 移除首頁下方的 Transport Quick Links / Transfer Warnings / Must Buy / Food Strategy 區塊。
- Transport 功能保留在 header banner 的 Transport panel，不重複出現在每日頁面。
- Food Strategy 不再呈現在 UI，只保留在行程規劃邏輯裡。
- Must Buy 只放在主要採買日 6/13 的每日行程內容中。
- Transport Panel 移除 Google Maps Routes 第二區塊。
- Google Maps route links 改整合進每日詳細行程的 Timeline 下方 Route Links。
- 6/2 與 6/14 的 Transfer Warning 仍只在當日首頁顯示。
- Weather Panel 保留 Open-Meteo 5 日天氣 + BoM 官方連結。

- v4 新增小型懸浮回到最上方按鈕，向下滑超過一定距離後出現。

- v5 新增 Help Panel 詳細版：
  - 官方緊急聯絡資訊
  - 駐墨爾本台北經濟文化辦事處聯絡資訊
  - Gorge Wildlife Park、Hertz、SIXT 聯絡資訊
  - 租車保險、車損確認、拋錨事故、住宿櫃檯英文問句小卡
  - 官方資料連結

- v6 精簡每日重點提醒：移除使用者指定的重複或不必要提醒，讓每日提醒更聚焦。

- v7 新增 Timeline 內嵌 A 點到 B 點導航卡：依每日行程顯示對應的 driving / transit / walking / airport signs，能開 Google Maps 的段落提供 Open Map；機場內部或不需 Google Maps 的段落則提供現場標示說明。

- v12 取消小型 sticky 日期控制列，恢復單純左右滑動日期列；回到最上方懸浮按鈕改為常駐顯示，避免滑動門檻造成看不到。

- v13 修正回到最上方按鈕無反應問題：補上 click event listener，並加入 window / documentElement / body 三層 scroll fallback。
