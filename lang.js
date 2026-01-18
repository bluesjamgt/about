/**
 * NINE OS Core Logic & Translations
 * Version: v1.15 (Full Content Integration)
 * Last Updated: 2026-01-14
 * Update Log:
 * - Fully integrated PrismStem (Project 0) detailed descriptions.
 * - Maintained feature-based structure (Feature > Language).
 */

// 原始翻譯資料 (依照功能分類)
const rawTranslations = {
  // --- Navbar (Global) ---
  nav_home: {
    en: "Blu J",
    tw: "Blu J",
    jp: "Blu J"
  },
  nav_about: {
    en: "About",
    tw: "關於",
    jp: "私について"
  },
  nav_dev: {
    en: "Dev",
    tw: "開發",
    jp: "開発"
  },
  nav_ai: {
    en: "AI",
    tw: "AI",
    jp: "AI"
  },
  nav_music: {
    en: "Music",
    tw: "音樂",
    jp: "音楽"
  },
  nav_notes: {
    en: "Notes",
    tw: "筆記",
    jp: "ノート"
  },

  // --- Footer (Unified) ---
  footer_quote: {
    en: "Moments",
    tw: "Moments",
    jp: "Moments"
  },
  footer_copy: {
    en: "© 2025 Blu J ",
    tw: "© 2025 Blu J ",
    jp: "© 2025 Blu J "
  },

  // --- Buttons (Global) ---
  btn_github: {
    en: "GitHub",
    tw: "GitHub",
    jp: "GitHub"
  },
  btn_chat: {
    en: "Let's Chat",
    tw: "開始對話",
    jp: "チャットする"
  },
  btn_view: {
    en: "View",
    tw: "查看頁面",
    jp: "見る"
  },

  // --- Index Page ---
  hero_title: {
    en: "Blu J",
    tw: "Blu J",
    jp: "Blu J"
  },
  hero_desc: {
    en: "A personal corner where analog and digital, technology and humanities coexist.",
    tw: "類比與數位間、科技與人文間，多領域並存的個人角落。",
    jp: "アナログとデジタル、テクノロジーと人文が共存する個人的なスペース。"
  },
  
  sect_about_title: {
    en: "Life & Spirits",
    tw: "人與酒",
    jp: "人と酒"
  },
  sect_about_text: {
    en: "Standing at the intersection of diverse fields: software & hardware development, sound creation, coffee & spirits, and American / Japanese arts & cultures.",
    tw: "駐足於多領域間，軟硬體專案開發、聲音創作、酒與咖啡、關注美/日藝文文化。",
    jp: "多領域の狭間に立つ。ソフトウェア・ハードウェア開発、サウンドクリエイション、酒とコーヒー、そして米国と日本の芸術文化。"
  },

  sect_ai_title: {
    en: "AI & Dev",
    tw: "AI 與開發",
    jp: "AI と 開発"
  },
  sect_ai_text: {
    en: "Evolving with the times, exploring tools in all forms. From independent LLM deployment to platform implementation, fulfilling creative purposes and solving problems.",
    tw: "隨著時代與時俱進，探索各種形式工具，AI、LLM的獨立部屬與平台實作運用，完成自己各種事物的「創造目的」，解決問題。",
    jp: "時代と共に進化し、あらゆるツールを探求する。AIやLLMの独自展開からプラットフォーム実装まで、「創造の目的」を達成し、問題を解決するために。"
  },
  
  btn_view_project: {
    en: "View Projects",
    tw: "開發專案",
    jp: "Dev プロジェクト"
  },
  btn_view_ai: {
    en: "View AI Works",
    tw: "AI 創作",
    jp: "AI アート"
  },

  sect_music_title: {
    en: "Sound & Space",
    tw: "聲音與空間",
    jp: "音と空間"
  },
  sect_music_text: {
    en: "Within the space of sound creation: guitar, arrangement, teaching, and bands. Performing in LiveHouses and music festivals.",
    tw: "在聲音創造的空間裡，吉他、編曲、教學與樂團，參與LiveHouse與音樂祭演出。",
    jp: "音を創る空間の中で。ギター、アレンジ、教育、そしてバンド活動。ライブハウスや音楽フェスへの出演。"
  },

  // --- AI Page ---
  page_title: {
    en: "AI Experiments",
    tw: "AI 視覺實驗",
    jp: "AI ビジュアル実験"
  },
  page_desc: {
    en: "Visual synthesis, prompt engineering, and the latent space.",
    tw: "視覺合成、咒語工程 (Prompt Engineering) 與潛在空間的探索。",
    jp: "視覚合成、プロンプトエンジニアリング、そして潜在空間。"
  },
  cat_t2i: {
    en: "Text to Image (T2I)",
    tw: "文字生成圖像 (T2I)",
    jp: "テキストから画像へ (T2I)"
  },
  cat_i2v: {
    en: "Image to Video (I2V) / Motion",
    tw: "圖像轉影片 (I2V) / 動態視覺",
    jp: "画像から動画へ (I2V) / モーション"
  },
  prompt_label: {
    en: "Prompt: ",
    tw: "咒語: ",
    jp: "プロンプト: "
  },

  // --- Dev Page Projects ---
  
  // P0: PrismStem (Flagship)
  dev_p0_title: {
    en: "PrismStem",
    tw: "PrismStem",
    jp: "PrismStem"
  },
  dev_p0_desc1: {
    en: "AI Audio Separation Workstation",
    tw: "AI 音訊分軌工作站",
    jp: "AI 音源分離ワークステーション"
  },
  dev_p0_desc2: {
    en: "Distinguished from generic online tools, this is a local-native stem separation workstation built for ultimate fidelity. It integrates the Demucs AI model with a custom Mini-DAW engine to precisely isolate vocals, drums, bass, and guitars without any cloud uploads. Featuring smart beat detection and a familiar real-time mixing interface, it is an essential tool for musicians to deconstruct and analyze audio with zero compromise.",
    tw: "不用綁線上服務與DAW介面化的分軌工具，注重音質還原的音樂分軌工具、人聲分離、吉他、貝斯、鼓組、其他樂器單獨抽離，與智慧節拍偵測產生。擺脫線上工具的頻率綁定，整合 Demucs AI 模型與專業級 Mini-DAW 播放引擎，無需上傳雲端，利用本機算力即可精準分離人聲與樂器。具備DAW風格介面、即時混音控制，是音樂人拆解分析的超實用工具。",
    jp: "一般的なオンラインツールとは一線を画す、究極の音質を追求したローカル完結型のAI音源分離ツールです。Demucs AIとMini-DAWエンジンを統合し、クラウドにアップロードすることなく、ボーカル、ギター、ベース、ドラムを高精度に分離。スマートなBPM検出機能とリアルタイム・ミキシング可能なDAW風UIを備え、楽曲構造を深く分析したいミュージシャンのための強力なソリューションです。"
  },

  // P1: yt-dlp-gui
  dev_p1_title: {
    en: "yt-dlp-gui",
    tw: "yt-dlp-gui (下載器)",
    jp: "yt-dlp-gui"
  },
  dev_p1_desc1: {
    en: "A modern, cross-platform GUI wrapper for the powerful yt-dlp tool.",
    tw: "強大 yt-dlp 工具的現代化跨平台圖形介面。",
    jp: "強力なyt-dlpツールのためのモダンなGUI。"
  },
  dev_p1_desc2: {
    en: "Download videos effortlessly with a clean, user-friendly interface.",
    tw: "透過簡潔直觀的介面，輕鬆下載影片。",
    jp: "クリーンなインターフェースで動画を簡単にダウンロード。"
  },

  // P2: FileProsApp
  dev_p2_title: {
    en: "FileProsApp",
    tw: "FileProsApp (檔案整理職人)",
    jp: "FileProsApp (ファイル整理職人)"
  },
  dev_p2_desc1: {
    en: "Universal batch file management tool.",
    tw: "批次萬能檔案整理工具。",
    jp: "万能な一括ファイル整理ツール。"
  },
  dev_p2_desc2: {
    en: "Advanced batch renaming, directory sorting, and naming configuration. Features image optimization, aspect ratio control, and format conversion. Efficiently compresses bloated files to free up disk space, ensuring safety with secure log deletion protocols.",
    tw: "檔案與目錄編及排序命名設定彙整、影像品質優化、比例設定與格式轉換功能、有效壓縮過度肥大檔案清理磁碟空間。Log安全刪除與防護機制。",
    jp: "ファイルとディレクトリの編集、並べ替え、命名設定を一括管理。画像の画質最適化、比率設定、フォーマット変換に加え、肥大化したファイルを効率的に圧縮してディスク領域を解放。ログの安全削除と保護機能も完備しています。"
  },

  // P3: ChatBot Base
  dev_p3_title: {
    en: "ChatBot Base in Dify",
    tw: "ChatBot Base in Dify",
    jp: "ChatBot Base in Dify"
  },
  dev_p3_desc1: {
    en: "RAG Precision Data Integration.",
    tw: "RAG資料 精準化整合。",
    jp: "RAGデータの精密な統合。"
  },
  dev_p3_desc2: {
    en: "Intelligent Chat Agent designed for smart interactions.",
    tw: "智慧化 Chat Agent，知識庫化精準對話體驗。",
    jp: "スマートな対話のためのインテリジェントChat Agent。"
  },

  // P4: Brand Page
  dev_p4_title: {
    en: "Brand Page Design",
    tw: "形象頁面設計",
    jp: "ブランドページデザイン"
  },
  dev_p4_desc1: {
    en: "Modern aesthetic UI/UX implementation.",
    tw: "現代風格 UI/UX 實作。",
    jp: "モダンなUI/UX実装。"
  },
  dev_p4_desc2: {
    en: "Responsive web design for Band Portfolio & Personal Branding.",
    tw: "樂團作品頁面與個人品牌的響應式網頁設計。",
    jp: "バンド作品ページと個人ブランドのためのレスポンシブWebデザイン。"
  }
};

// --- 自動轉換邏輯 (Transform Logic) ---
// 這段程式碼會將上面的 rawTranslations 轉換回原本 translations = { en: {...}, tw: {...}, jp: {...} } 的結構
const translations = { en: {}, tw: {}, jp: {} };

for (const key in rawTranslations) {
  translations.en[key] = rawTranslations[key].en;
  translations.tw[key] = rawTranslations[key].tw;
  translations.jp[key] = rawTranslations[key].jp;
}


/**
 * 切換語言函式
 */
function setLang(lang) {
  localStorage.setItem('site_lang', lang);
  
  // 更新按鈕樣式
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('font-bold', 'underline'));
  const activeBtn = document.getElementById('btn-' + lang);
  if (activeBtn) activeBtn.classList.add('font-bold', 'underline');

  // 執行翻譯
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

/**
 * 圖集滾動功能
 */
function scrollGallery(direction) {
  const gallery = document.getElementById('gallery');
  if (gallery) {
      const scrollAmount = 300; 
      gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}

/**
 * 偵測系統語言
 */
function detectSystemLang() {
  const sysLang = navigator.language.toLowerCase();
  
  // 如果包含 'zh' (zh-TW, zh-CN, zh-HK) -> 回傳 tw
  if (sysLang.includes('zh')) return 'tw';
  
  // 如果包含 'ja' -> 回傳 jp
  if (sysLang.includes('ja')) return 'jp';
  
  // 其他情況 -> 回傳 en
  return 'en';
}

/**
 * 自動初始化
 */
document.addEventListener('DOMContentLoaded', async () => {
  // 決定要用什麼語言：
  // 優先讀取 localStorage (使用者上次選的)
  // 如果沒有，就呼叫 detectSystemLang() 自動偵測
  const savedLang = localStorage.getItem('site_lang') || detectSystemLang();

  // 載入 Navbar
  const container = document.getElementById('navbar');
  if (container) {
      try {
        const res = await fetch('navbar.html');
        if (res.ok) {
          const html = await res.text();
          container.innerHTML = html;
          // Navbar 載入後，立刻翻譯
          setLang(savedLang); 
        }
      } catch (e) { console.error("Navbar load failed", e); }
  }
  
  // 初始化頁面內容
  setLang(savedLang);
});