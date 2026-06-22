# Music Lab Bluemap

> 這份文件是目前互動音樂頁面的設計基準。後續功能可以長大，但不要偏離這裡定義的視覺語言、區塊角色與目錄拆分方向。

## 產品定位

- 目標：把音樂教學、互動工具、作品履歷與私人行銷整合成同一個 Music Lab。
- 語氣：不是傳統教材網站，也不是單純功能玩具；要像一個可操作的音樂履歷工作台。
- 目前第一個工具：調性指板地圖，之後會平行做鍵盤/鋼琴版本。

## 五大版型區域

1. `Global Toolbar`：上方主控制列，控制弦數、調弦、材質、Key Root、Scale、顯示模式、指板文字、格數、縮放與長寬比。
2. `FORM`：畫布上方的雙圖層 Scale / Chord / Pattern 區，負責定義要顯示的音集合與比較層。
3. `Canvas Stage`：主要畫布區，目前是指板；未來可替換成鍵盤、五線譜或其他互動畫布。
4. `SCOPE`：畫布下方的選取分析區，未來分析圈選音、音程、和弦可能性、級數關係。
5. `Info Panel`：資訊顯示區，顯示位置、音名、唱名、級數、調性關係等即時資訊。

正式稱呼建議用 `section / panel / component / layout region`。不要用 `table` 當版型概念；`div` 只是 HTML 容器，不是產品架構名稱。

## Canvas Stage 視覺規則

- 指板預設白色，材質切換只作用於指板畫布範圍。
- 上弦枕與空弦調弦音必須獨立顯示，不要產生重複的第 0 格。
- 最高與最低弦外側不要冒出多餘 fret 線。
- 指板材質底色只從最高弦中心線延伸到最低弦中心線，不要超出上下弦外側。
- 指板音點以低彩、留白、清楚對比為主，避免抄襲既有教學網站色系。
- 選取狀態使用白色細外框，不用淡紅色。

## 音名與工具列規則

- 下方音名列是 `Pitch Switchboard`，負責音名總開關與快速篩選。
- 音名按鈕中心只放音名，級數放在按鈕外框下方，像別名標籤，不搶主視覺。
- 十二音模式右側用 `<` 收合成七音模式；七音模式右側用 `>` 展開。
- 音名按鈕三段行為：關閉、只顯示、恢復顯示；只顯示可以多音並存。
- 指板單點三段行為：未顯示 -> 顯示 -> 選取 -> 關閉，之後可接音程分析。
- `Canvas Tool Strip` 是 Pitch Switchboard 下方同尺寸方框，不是畫布左側側欄。
- 工具方框中間文字只用英文代號或合適 emoji，不用中文。暫定：
  - `Hi`：Hide all，一鍵清空顯示並進入 custom 空白模式
  - `✏️`：點選循環顯示/選取/關閉
  - `🧽`：橡皮擦，點選就隱藏
  - `SAT` / `BLU`：彩色與低彩藍色模式切換
  - `JPG`：輸出目前指板本體，不包含上方控制列、右側調色盤與下方工具列
- `Hi` 之後如重新點選 Key Root 或 Scale，即使選到同一個值，也要回到目前 Key/Scale 的調內音顯示。

## FORM 雙圖層規則

- `FORM` 使用 `Layer A / Layer B`，不是單一 Chord/Arp 選單。
- `Layer A` 是主分析層，右上 Current Key、音名拼法、級數與唱名預設依 A 層為準。
- `Layer B` 是比較層，預設可關閉；適合放 Dorian、Blues、Pentatonic、另一個 chord tone 等。
- 每層固定結構為：Enabled、Type、Root、Variant、Formula、Pattern。
- `Type` 決定 `Variant` 下拉內容：Scale 時顯示音階/調式，Chord 時顯示和弦品質。
- Type 為 `Scale` 時，Formula 由 Variant 自動產生，例如 Dorian = `1 2 b3 4 5 6 b7`。
- Type 為 `Chord` 時，Formula 由 Variant 自動產生，例如 m7b5 = `1 b3 b5 b7`。
- 不要同時顯示 Scale 與 Chord 兩個下拉，避免學生誤以為兩者會同時作用於同一層。
- A-only 使用原音名色，B-only 使用 B 層對比色，A+B 重疊音使用雙圈外環。
- 不使用位移圓點作為主要重疊視覺，避免學生誤判音的位置。

## 色彩規則

預設低彩音名色：

- C `#D8C85A`
- D `#C98C63`
- E `#9A86BC`
- F `#6E93DB`
- G `#7FB39A`
- A `#D78479`
- B `#5FA7B4`

低彩/無彩色模式使用白底、黑框、F 藍 `#6E93DB` 文字；不要回到全黑字的沉重樣式。

## 功能規劃

- Key / Scale：依調性正確顯示升降記號，不同 Key 不能同時顯示等音名稱。
- Scale：支援 Major、minor、harmonic minor、melodic minor、major/minor pentatonic、blues、Ionian、Dorian、Phrygian、Lydian、Mixolydian、Aeolian、Locrian。
- Chord：支援 Maj、min、dim、aug、sus、7、Maj7、min7、m7b5、dim7。
- Pattern：第一版支援 All、Box A-F、Linear。Box 以各層 Root 附近的五格範圍計算，Linear 以目前選取弦作單弦橫向顯示。
- Selection Analysis：從圈選音分析音程、和弦候選、級數與調性關係。
- Export：先支援 JPG，後續加入 A4 / PDF。JPG 以純 SVG 重新繪製目前指板再轉圖，避免 DOM foreignObject 截圖失敗。輸出按鈕屬於畫布工具列，不放在畫布左側。
- Persistence：所有設定暫存瀏覽器，避免重新整理後消失。
- Routing：網址列盡量呈現同一頁體驗，不暴露直白檔名。

## 目錄結構方向

```text
music/
  index.html
  assets/
    styles/
      workbench.css
    modules/
      core/
        theory.js
        storage.js
        export.js
      axon/
        app.js
      lumen/
        app.js
    data/
      scales.json
      chords.json
      patterns.json
  content/
    canon/
    rigs/
    loops/
  media/
    images/
    loops/
  tools/
    export/
  under_construction/
    bluemap.md
```

## 模組代號

- `core`：共用音名、調性、資料讀取、儲存、輸出。
- `axon`：弦類/指板工具，目前主功能。
- `lumen`：鍵盤/鋼琴工具，未來平行於 axon。
- `canon`：樂理教材與基本教科書式內容。
- `rigs`：器材、錄音、效果器與音色知識。
- `loops`：Loop 素材、練習節奏與伴奏。
- `export`：JPG、A4、PDF 輸出流程。

## 命名準則

- 不用 `guitar` 這類過大的直白名稱當主模組，避免未來分類塞爆。
- 大方向用代號，小功能再用清楚名稱。
- UI 版型叫 `section / panel / stage / switchboard / toolbar`；HTML 實作可用 `section`、`aside`、`div`，但產品討論不稱為「DIV 區」。
- CSS/JS 拆分要比功能成長更早開始，不讓 `index.html` 一路膨脹。
