# GT / PI Layout 檢討報告

## 現象

同一個 `stage` 區域中，GT/Fingerboard 能維持可接受的滿版畫布；PI/Keyboard 只把主體換成琴鍵後，卻出現大量白色空白、琴鍵位置偏右或偏下、調色盤位置不穩等問題。

## 主要原因

1. **CSS 已出現結構錯位**

   `workbench.css` 目前有疑似缺少結尾大括號或區塊錯位的跡象。  
   例如 `.theory-note-card` 後面直接接到 `.stage.theme-maple`，代表中間 CSS 區塊可能被 parser 誤讀。這會造成後續 `.stage`、`.keyboard-map`、`.marker` 等規則不穩定，導致「改了 CSS 但畫面不照預期」。

2. **GT 與 PI 沒有真正抽象成同一個 Canvas 架構**

   目前 DOM 是：

   - `stage`
   - `canvas-work`
   - `stage-layout`
   - `fretboard`
   - `keyboard-map`
   - `palette-legend`
   - `note-switchboard`

   GT 原本是為 `fretboard + palette` 設計，PI 是後來塞進同一個 `stage-layout`。  
   但 PI 的鍵盤不是指板格線，尺寸邏輯不同，直接共用 `stage-layout` 很容易互相污染。

3. **`note-switchboard` 不在 `stage-layout` 內**

   指板頁時這樣還算可接受，因為主體很寬。  
   PI 頁時，鍵盤本體很小，`note-switchboard` 卻跟 `keyboard-map` 分離，導致視覺中心被拆成上下兩段，空白感被放大。

4. **PI 的高度控制是補丁式修正**

   先後嘗試過：

   - `fit-content`
   - `max-content`
   - `100%`
   - 修改 `.main.is-keyboard-page`

   但這些都是在同一個壞掉的共享版型上修補，沒有先定義 PI 頁自己的 layout contract，所以每次修一邊，另一邊就跑掉。

5. **調色盤是否顯示沒有清楚規格**

   一開始 PI 隱藏調色盤，後來又要求恢復。  
   這代表 PI 頁應該先定義清楚：

   - 鍵盤是否與調色盤同列
   - 小鍵盤模式是否仍保留右側調色盤
   - 88 鍵時調色盤是否固定右側或移到下方

## 不是對話污染的核心問題

不是單純因為在 GT 對話中設計 PI。真正問題是：目前程式還是單檔單版型思維，GT 版型尚未抽象成「可替換樂器畫布」。PI 被加進來時，是用 patch 疊 patch 的方式塞入既有 GT DOM/CSS，因此容易大跑版。

## 建議重整順序

1. **先停止微調 PI CSS**

   在 CSS 結構修正前，不應繼續調 `center / fit-content / max-content`。

2. **先修復 CSS 區塊完整性**

   檢查並整理 `workbench.css`：

   - 每個 selector block 是否正常關閉
   - theme / stage / fretboard / keyboard / marker 是否各自獨立
   - 移除重複或殘留的補丁規則

3. **建立正式區塊命名**

   建議拆成：

   - `instrument-shell`
   - `instrument-toolbar`
   - `form-panel`
   - `instrument-stage`
   - `instrument-canvas`
   - `instrument-palette`
   - `pitch-switchboard`
   - `scope-panel`

4. **GT 與 PI 共用外殼，不共用內部 canvas**

   外層共用：

   - toolbar
   - form
   - palette
   - pitch switchboard
   - scope

   內層分開：

   - `renderFretboardCanvas()`
   - `renderKeyboardCanvas()`

5. **PI layout 先定義三種模式**

   - `compact`: 1 octave / 2 octaves，鍵盤置中，調色盤右側或下方
   - `medium`: 49 / 61 keys，鍵盤水平捲動，調色盤右側
   - `full`: 88 keys，鍵盤滿版橫向畫布，調色盤可折疊

## 結論

目前 PI 大跑版不是單一 CSS 屬性錯，而是「CSS 結構錯位 + GT 專用 layout 被硬塞 PI + 沒有 canvas contract」三個問題疊在一起。

下一步應該先整理 CSS 與 canvas 架構，再重新接 PI。不要再用局部置中補丁硬修。
