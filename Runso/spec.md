# 系統規格書 (System Specification) - runso/ Editor

## 1. 產品概述
**專案名稱：** `runso/ Editor`
**品牌所屬：** Runner's Blue
**核心定位：** 專為音樂創作者打造的「所見即所得 (WYSIWYG)」歌詞與和弦編排工具。
**技術棧：** 純前端 (HTML5 / CSS3 / Vanilla JavaScript)，無後端資料庫需求。

## 2. 核心架構與資料流 (Data Flow)
* **Single Source of Truth (單一資料源)：** 採用類似 ChordPro 的純文字標籤格式儲存資料。
  * 格式定義：`[和弦名稱|拍子長度|段落標籤]` (例如：`[C#m7|4|Verse 1]`)。
* **雙向綁定機制：** * `View 1 (Raw)` 與 `View 2 (Arrange)` 共用同一套底層字串資料。
  * 在 `View 2` 畫布上的任何視覺化操作（新增和弦框、修改和弦文字），都會在背景反向解析回 ChordPro 格式，確保資料不滅。

## 3. UI/UX 佈局設計
整體採用 Notion 風格的極簡排版 (Inter 字體、高對比留白、淺灰輔助色)。

### 3.1 頂部導覽列 (Header)
* **專案 Meta 資料區：** 曲名 (Title)、藝人 (Artist)、BPM。
* **全域操作按鈕：**
  * `開新專案` (清除當前狀態)。
  * `專案列表` (開啟 Modal，管理所有儲存的專案)。
  * `儲存 Session` (將當前進度寫入 `localStorage`)。
  * `匯出 PDF` (觸發瀏覽器列印機制)。

### 3.2 視圖切換區 (Tabs)
* **Tab 1: 貼上歌詞 (Raw)**
  * 用途：純文字 Textarea，用於快速貼上 Notion 的零散歌詞，或直接檢視/編輯 ChordPro 原始碼。
* **Tab 2: 歌詞+和弦編輯 (Arrange) - *系統核心***
  * 用途：`contenteditable` 視覺化編輯畫布。
  * 支援直接打字、按 Enter 換行、按空白鍵進行縮排。
  * 和弦錨點漂浮於字元或空格的左上方。
* **Tab 3: 純和弦 (Lead Sheet)**
  * 用途：自動彙整全曲和弦，依據「段落標籤 (Section)」進行視覺化分塊 (Grid) 顯示，隱藏所有歌詞。

### 3.3 右側屬性與控制面板 (Sidebar)
* **定位點屬性編輯區 (Inspector)：**
  * 當在 `View 2` 選取任何和弦標籤時，顯示並連動編輯該和弦的：和弦名稱、拍數 (1/2/4拍)、段落標籤 (Intro/Verse等)。
* **版面與列印設定區 (Layout Controls)：**
  * Range Slider: 和弦字體大小 (Chord Size)。
  * Range Slider: 歌詞字體大小 (Lyric Size)。
  * Range Slider: 行距調整 (Line Height，用於壓縮排版消滅過多空白)。
  * Checkbox: 雙排格式 (Two-Column Layout 切換)。

## 4. 核心功能模組細節

### 4.1 所見即所得畫布 (WYSIWYG Canvas)
* **無中生有和弦：** 允許使用者將游標放置於畫布的「任何位置」(句首、句末、字元之間、純空白行)。
* **插入機制：** 透過快捷鍵 `Ctrl + K` 或工具列「➕插入和弦」按鈕，在游標處生成一個可直接輸入文字的「和弦輸入框」。
* **輸入框特性：** 點擊聚焦後可直接打字，失去焦點時外觀呈現純文字 (無外框)，且不影響下方歌詞的流動排版。

### 4.2 專案管理系統 (Session Manager)
* **儲存機制：** 使用瀏覽器原生 `localStorage` (`runsoProjectList`)。
* **功能：**
  * 儲存時包含 Meta 資料 (標題、藝人、BPM)、更新時間及 ChordPro 字串。
  * Modal 彈窗顯示所有已儲存的專案列表。
  * 支援點擊「讀取」載入專案，或點擊「刪除」清除特定專案。

### 4.3 完美 PDF 匯出 (Print Media Query)
* **列印樣式覆蓋 (`@media print`)：**
  * 強制隱藏：Header、Tabs、Sidebar、按鈕、和弦輸入框的輔助框線及背景。
  * 強制顯示：於頁面頂部生成包含 Title、Artist、BPM 的正式標題區塊。
  * 保留使用者在面板設定的版面參數 (雙欄、字體大小、行距)，做到 100% 所見即所得的 A4 列印輸出。

## 5. 開發防呆與邊界條件
* CSS 結構必須嚴格閉合，避免 `@media print` 區塊引發全域排版崩潰 (針對先前的 `css-lcurlyexpected` 錯誤進行修復)。
* 防呆機制：從 `View 2 (畫布)` 切換至其他 Tab 時，必須強制執行 `editorToRaw()` 序列化資料，防止 DOM 狀態與底層字串脫鉤。
* 在畫布內按 `Enter` 必須被攔截並轉為原生的換行 (`<br>` 或 `\n`)，禁止產生多餘的 `<div>` 破壞 ChordPro 的行號解析。