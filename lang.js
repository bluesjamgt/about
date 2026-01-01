/**
 * NINE OS Core Logic & Translations
 * Version: v1.11 (Content Alignment)
 * Last Updated: 2025-12-29
 * * Update Log:
 * - Unified Footer format across all languages (Minimalist style).
 * - Synchronized Index page content based on the latest TW version.
 */

const translations = {
    en: {
      // --- Navbar (Global) ---
      nav_home: "Blu J",
      nav_about: "About",
      nav_dev: "Dev",
      nav_ai: "AI",
      nav_music: "Music",
      nav_notes: "Notes",
  
      // --- Footer (Unified) ---
      footer_quote: "Moments",
      footer_copy: "© 2025 Blu J ",
      btn_github: "GitHub", 
  
      // --- Index Page (Aligned with TW) ---
      hero_title: "Blu J",
      hero_desc: "A personal corner where analog and digital, technology and humanities coexist.",
      
      sect_about_title: "Life & Spirits", 
      sect_about_text: "Standing at the intersection of diverse fields: software & hardware development, sound creation, coffee & spirits, and American-Japanese culture.",
      
      sect_ai_title: "AI & Dev",
      sect_ai_text: "Evolving with the times, exploring tools in all forms. From independent LLM deployment to platform implementation, fulfilling creative purposes and solving problems.",
      
      btn_view_project: "View Projects",
      btn_view_ai: "View AI Works",
      
      sect_music_title: "Sound & Space", 
      sect_music_text: "Within the space of sound creation: guitar, arrangement, teaching, and bands. Performing in LiveHouses and music festivals.",
  
      // --- AI Page ---
      page_title: "AI Experiments",
      page_desc: "Visual synthesis, prompt engineering, and the latent space.",
      cat_t2i: "Text to Image (T2I)",
      cat_i2v: "Image to Video (I2V) / Motion",
      prompt_label: "Prompt: ",

      // --- Dev Page ---
      dev_p1_title: "yt-dlp-gui",
      dev_p1_desc1: "A modern, cross-platform GUI wrapper for the powerful yt-dlp tool.",
      dev_p1_desc2: "Download videos effortlessly with a clean, user-friendly interface.",
      
      dev_p2_title: "Project Two",
      dev_p2_desc1: "Feature A: Short technical explanation.",
      dev_p2_desc2: "Feature B: More detail about its role or benefit.",

      dev_p3_title: "Project Three",
      dev_p3_desc1: "Feature A: Key technology and purpose.",
      dev_p3_desc2: "Feature B: Why it is useful or unique."
    },
    
    tw: {
      // --- Navbar ---
      nav_home: "Blu J",
      nav_about: "關於",
      nav_dev: "開發",
      nav_ai: "AI",
      nav_music: "音樂",
      nav_notes: "筆記",
  
      // --- Footer ---
      footer_quote: "Moments",
      footer_copy: "© 2025 Blu J ",
      btn_github: "GitHub",
  
      // --- Index Page ---
      hero_title: "Blu J",
      hero_desc: "類比與數位間、科技與人文間，多領域並存的個人角落。",
      
      sect_about_title: "人與酒",
      sect_about_text: "駐足於多領域間，軟硬體專案開發、聲音創作、酒與咖啡、美日文化。",
      
      sect_ai_title: "AI 與開發",
      sect_ai_text: "隨著時代與時俱進，探索各種形式工具，AI、LLM的獨立部屬與平台實作運用，完成自己各種事物的「創造目的」，解決問題。",
      
      btn_view_project: "開發專案",
      btn_view_ai: "AI 創作",
      
      sect_music_title: "聲音與空間",
      sect_music_text: "在聲音創造的空間裡，吉他、編曲、教學與樂團，參與LiveHouse與音樂祭演出。",
  
      // --- AI Page ---
      page_title: "AI 視覺實驗",
      page_desc: "視覺合成、咒語工程 (Prompt Engineering) 與潛在空間的探索。",
      cat_t2i: "文字生成圖像 (T2I)",
      cat_i2v: "圖像轉影片 (I2V) / 動態視覺",
      prompt_label: "咒語: ",

      // --- Dev Page ---
      dev_p1_title: "yt-dlp-gui",
      dev_p1_desc1: "強大的 yt-dlp 工具的現代化跨平台圖形介面封裝。",
      dev_p1_desc2: "透過簡潔友善的介面輕鬆下載影片。",
      
      dev_p2_title: "專案二號",
      dev_p2_desc1: "功能 A：簡短的技術說明。",
      dev_p2_desc2: "功能 B：關於其角色或優勢的更多細節。",

      dev_p3_title: "專案三號",
      dev_p3_desc1: "功能 A：關鍵技術與目的。",
      dev_p3_desc2: "功能 B：其實用性或獨特性。"
    },
    
    jp: {
      // --- Navbar ---
      nav_home: "Blu J",
      nav_about: "私について",
      nav_dev: "開発",
      nav_ai: "AI",
      nav_music: "音楽",
      nav_notes: "ノート",
  
      // --- Footer ---
      footer_quote: "Moments",
      footer_copy: "© 2025 Blu J ",
      btn_github: "GitHub",
  
      // --- Index Page (Aligned with TW) ---
      hero_title: "Blu J",
      hero_desc: "アナログとデジタル、テクノロジーと人文が共存する個人的なスペース。",
      
      sect_about_title: "人と酒", // 人與酒
      sect_about_text: "多領域の狭間に立つ。ソフトウェア・ハードウェア開発、サウンドクリエイション、酒とコーヒー、そして米日文化。",
      
      sect_ai_title: "AI と 開発",
      sect_ai_text: "時代と共に進化し、あらゆるツールを探求する。AIやLLMの独自展開からプラットフォーム実装まで、「創造の目的」を達成し、問題を解決するために。",
      
      btn_view_project: "Dev プロジェクト",
      btn_view_ai: "AI アート",
      
      sect_music_title: "音と空間", // 聲音與空間
      sect_music_text: "音を創る空間の中で。ギター、アレンジ、教育、そしてバンド活動。ライブハウスや音楽フェスへの出演。",
  
      // --- AI Page ---
      page_title: "AI ビジュアル実験",
      page_desc: "視覚合成、プロンプトエンジニアリング、そして潜在空間。",
      cat_t2i: "テキストから画像へ (T2I)",
      cat_i2v: "画像から動画へ (I2V) / モーション",
      prompt_label: "プロンプト: ",

      // --- Dev Page ---
      dev_p1_title: "yt-dlp-gui",
      dev_p1_desc1: "強力な yt-dlp ツールのためのモダンなクロスプラットフォーム GUI ラッパー。",
      dev_p1_desc2: "クリーンで使いやすいインターフェースで動画を簡単にダウンロード。",
      
      dev_p2_title: "プロジェクト 2",
      dev_p2_desc1: "機能 A：短い技術的な説明。",
      dev_p2_desc2: "機能 B：その役割や利点に関する詳細。",

      dev_p3_title: "プロジェクト 3",
      dev_p3_desc1: "機能 A：主要な技術と目的。",
      dev_p3_desc2: "機能 B：その有用性や独自性。"
    }
  };
  
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